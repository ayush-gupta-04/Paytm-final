"use client"
import { usePathname, useRouter } from "next/navigation";


//icon --> a react function like a children (therefore reactnode)
export function SidebarItem ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname()
    const selected = (pathname === href)
    console.log(pathname)
    return (
        <div className={`flex flex-row gap-2 cursor-pointer ${selected?"text-[#2e89ff]":"text-slate-600"}`} 
        onClick={() => {router.push(href)}}>
            <div className="self-center">
                {icon}
            </div>
            <div className={` font-semibold text-xl`}>
                {title}
            </div>
        </div>
    )
}