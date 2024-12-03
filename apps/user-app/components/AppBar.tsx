'use client'
import AppBar from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AppBarClient(){
    const session = useSession();
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