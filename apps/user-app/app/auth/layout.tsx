export default function AuthLayout({children} : {children : React.ReactNode}){
    return(
        <div className="h-full w-full bg-blue-100 flex justify-center items-center">
            {children}
        </div>
    )
}