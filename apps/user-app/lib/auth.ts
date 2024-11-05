import CredentialsProvider from 'next-auth/providers/credentials';
import  prisma from "@paytm-repo/db/client";
// import GoogleProvider from 'next-auth/providers/google'
import bcrypt from "bcrypt"
import { signOut } from 'next-auth/react';

export const NEXT_AUTH = {
    providers : [
        CredentialsProvider({
            name: 'Email',
            credentials: {
              username: { label: 'Email', type: 'text', placeholder: '' },
              password: { label: 'Password', type: 'password', placeholder: '' },
            },
            async authorize(credentials : any) {
                const email = credentials.username as string;
                const password = credentials.password as string;
                try {
                    const data = await prisma.user.findFirst({
                        where : {
                            email : email
                        }
                    })
                    if(data && data.isEmailVerified){
                        const passMatched = await bcrypt.compare(password,data.password)
                        if(passMatched){
                            return{
                                id : data.id,
                                name : data.firstname + " " + data.lastname,
                                email : data.email,
                                phone : data.phone
                            }
                        }else{
                            return null
                        }
                    }else{
                        return null;
                    }
                } catch (error) {
                    return null
                }
            },
        }),
    ],
    
    pages : {
        signIn : '/auth/signin',
        signOut : '/auth/signin'
    },
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
        session : ({session,token} : any) => {
            session.user.id = token.sub;
            return session;
        }
    }
}
