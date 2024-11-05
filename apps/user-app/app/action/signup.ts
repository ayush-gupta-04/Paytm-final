'use server'
import {SignupFormat} from "@repo/schema/zod";
import prisma from "@paytm-repo/db/client"
import { signupSchema } from "@repo/schema/zod";
import bcrypt from "bcrypt";
import { sendMail } from "../../lib/mail";
import jwt from "jsonwebtoken";

export async function CreateNewAccount(user : SignupFormat){
    const success = signupSchema.safeParse(user);
    if(success){
        try {
            const userExist = await prisma.user.findFirst({
                where : {
                    OR : [
                        {email : user.email},
                        {phone : user.phone}
                    ]
                }
            })
            if(userExist){
                return{
                    success : false,
                    message : "User already exist"
                }
            }
            const hashedPass = await bcrypt.hash(user.password,10);
            var randomOtp = '';
            for(var i = 0 ; i < 6 ; i++){
                randomOtp += Math.floor(Math.random()*10);
            }
            const currTime = Date.now() + 5*60*1000 + '';
            try {
                const userWithBalance = await prisma.$transaction(async (tnx) => {
                    const newUser = await tnx.user.create({
                        data : {
                            firstname : user.firstname,
                            lastname : user.lastname,
                            email : user.email,
                            password : hashedPass,
                            phone : user.phone,
                            otp : randomOtp,
                            otpExpiry : currTime
                        }
                    })
                    await tnx.balance.create({
                        data : {
                            amount : 0,
                            locked : 0,
                            userId : newUser.id
                        }
                    })
                    return newUser
                })
        
                const userIdToken = jwt.sign(userWithBalance.id,process.env.JWT_SECRET || '')
                //send email
                const result = await sendMail({email : user.email,otp : randomOtp})
                if(result.accepted){
                    return{
                        success : true,
                        message : "OTP send to email",
                        userIdToken : userIdToken
                    }
                }else{
                    return{
                        success : false,
                        message : "Trouble in sending OTP. Verify email via Login"
                    }
                }
            } catch (error) {
                return{
                    success : false,
                    message : "Something went wrong!"
                }
            }
        } catch (error) {
            return{
                success : false,
                message : "Something went wrong!"
            }
        }
    }
    else{
        return{
            success : false,
            message : "Invalid Inputs"
        }
    }
}