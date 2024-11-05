export default function AuthLayout({children} : {children : React.ReactNode}){
    return(
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-violet-700 flex justify-center items-center">
            {children}
        </div>
    )
}