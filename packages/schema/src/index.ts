import zod from "zod";

export const signupSchema = zod.object({
    firstname : zod.string({invalid_type_error : "Firstname should be of type String"}).min(1,{
        message : "firstname cannot be empty"
    }),
    lastname : zod.string({invalid_type_error : "Lastname should be of type String"}),
    phone : zod.string().length(10,{message : "length must be 10"}).refine((data) => {
        for(let i = 0; i < data.length ; i++){
            if((Number(data.charAt(i)) >= 0 && Number(data.charAt(i)) <= 9)){
                return true;
            }
            return false;
        }
        return true;
    },{message : "Phone number should only contain numbers."}),
    password : zod.string().min(8,{message : "Password should be min of 8 characters"}),
    email : zod.string().email()
})

export const signinSchema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(8,{message : "Password should be min of 8 characters"})
})
export const otpSchema = zod.object({
    otp : zod.string().length(6,{message : "Otp must be of 6 digits"})
})
export const emailSchema = zod.object({
    email : zod.string().email(),
})
export const changePassSchema = zod.object({
    password : zod.string().min(8,{message : "Password should be min of 8 characters"}),
    confirmPass : zod.string().min(8,{message : "Password should be min of 8 characters"})
}).refine((data) => {
    if(data.password == data.confirmPass){
        return true;
    }
    return false;
},{message : "Password and confirm Pass should match"});
export const addMoneySchema = zod.object({
    amount : zod.string().min(1,{message : "This Field is required"}).refine((money) => {
        for(var i = 0 ; i < money.length ; i++){
            if(!(Number(money.charAt(i)) >= 0 && Number(money.charAt(i)) <= 9)){
                return false;
            }
            return true;
        }
    },{message : "Amount must be a number"}).refine((data) => {
        if(Number(data.charAt(0)) == 0){
            return false;
        }
        return true;
    }),
    bankName : zod.string({required_error : "This field is required"}).min(1,{message : "Bank cannot be Empty"}),
})
export const p2pSchema = zod.object({
    amount : zod.string().min(1,{message : "This Field is required"}).refine((money) => {
        for(var i = 0 ; i < money.length ; i++){
            if(!(Number(money.charAt(i)) >= 0 && Number(money.charAt(i)) <= 9)){
                return false;
            }
            return true;
        }
    },{message : "Amount must be a number"}).refine((data) => {
        if(Number(data.charAt(0)) == 0){
            return false;
        }
        return true;
    }),
    phone : zod.string().length(10,{message : "length must be 10"}).refine((data) => {
        for(let i = 0; i < data.length ; i++){
            if((Number(data.charAt(i)) >= 0 && Number(data.charAt(i)) <= 9)){
                return true;
            }
            return false;
        }
        return true;
    },{message : "Phone number should only contain numbers."}),
    password : zod.string().min(8,{message : "Password should be min of 8 characters"})
})
export type SignupFormat = zod.infer<typeof signupSchema>;
export type SigninFormat = zod.infer<typeof signinSchema>;
export type otpFormat = zod.infer<typeof otpSchema>;
export type emailFormat = zod.infer<typeof emailSchema>;
export type changePassFormat = zod.infer<typeof changePassSchema>;
export type addMoneyFormat = zod.infer<typeof addMoneySchema>;
export type p2pFormat = zod.infer<typeof p2pSchema>;