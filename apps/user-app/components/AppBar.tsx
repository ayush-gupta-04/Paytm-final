'use client'
import AppBar from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function AppBarClient(){
    const session = useSession();
    const router = useRouter();
    return(
        <div>
            <AppBar 
            onSignin={() => {
                signIn()
            }} 
            onSignout={async () => {
                //we will be redirected to this callback after signout.
                //default callback is from where we invked the signout function.
                await signOut({callbackUrl : "http://localhost:3000"})
            }} 
            userData = {session.data?.user}
            ></AppBar>
        </div>
    )
}