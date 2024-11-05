import nodemailer from "nodemailer";
type SendEmailArg = {
    email : string,
    otp : string
}
export async function sendMail({email, otp }: SendEmailArg){
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ce67b48a4eb409",
          pass: "41e6471f5fa1b4"
        }
    });
    const result = await transport.sendMail({
        from: 'PaytmVerificationTeam.com',
        to: email,
        subject: "Email Verification via OTP",
        text: `OTP is ${otp}`
    })
    return result;
}