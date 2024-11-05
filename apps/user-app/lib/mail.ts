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
          user: process.env.SMTP_USER_ID,
          pass: process.env.SMTP_USER_PASSWORD
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