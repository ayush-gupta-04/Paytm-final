'use client'
import { notificationAtom, socketAtom } from "@paytm-repo/store/atom";
import AppBar from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function AppBarClient({userId} : {userId : any}){
    const router = useRouter();
    const session = useSession();
    const[socket,setSocket] = useRecoilState(socketAtom);
    const setNotification = useSetRecoilState(notificationAtom);
    useEffect(() => {
        if(userId){
            const socket = new WebSocket(`ws://localhost:8080?id=${userId}`);
            socket.onopen = () => {
                setSocket(socket)
            }
            socket.onmessage = (msg) => {
                setNotification(JSON.parse(msg.data).message);
            }
            return () =>{
                console.log("closing webSocket")
                socket.close()
            }
        }
        
    },[])
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
            settings = {() => {router.push('/settings')}}
            ></AppBar>
        </div>
    )
}