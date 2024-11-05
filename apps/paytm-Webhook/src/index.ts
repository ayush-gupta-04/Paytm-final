import prisma from "@paytm-repo/db/client";
import express from "express"
const app = express();
app.use(express.json());
app.post('/api/paytm/webhook',async (req,res) => {
    //TODO : only run this logic if onRamp is processing........DONE
    //amount is Int & *100
    const {userId,amount,token} = req.body;
    try {
        const result = await prisma.$transaction(async (tnx) => {
            await tnx.balance.update({
                where : {
                    userId : userId
                },
                data : {
                    amount : {
                        increment : amount
                    }
                }
            })

            //onRamptransaction should be a processing then only we will increment.
            const onRampTnx = await tnx.onRampTransaction.update({
                where : {
                    token : token,
                    status : 'processing'
                },
                data : {
                    status : "success"
                }
            })
            if(!onRampTnx){
                return false
            }else{
                return true
            }
        })
        if(result){
            res.status(200).json({
                success : true,
                message : "captured"
            })
        }else{
            res.status(200).json({
                success : false,
                message : "Already Done!"
            })
        }
    } catch (error) {
        //onsending a bad status code the bank will know that the payment was faliure.
        //so it will refund
        res.status(400).json({
            success : false,
            message : "faliure"
        })
    }
})
app.listen(3003)