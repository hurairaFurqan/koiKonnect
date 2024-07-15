import nodemailer from "nodemailer";
import User from "../models/user.model";
import bycryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bycryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findOneAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === "ResetPassword") {
            await User.findOneAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "195d6f13e6c642",
                pass: "64f8179294a3ad"
            }
        });


        const mailOptions = {
            from: '"hurairaFurqan13@gmail.com"',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${encodeURIComponent(hashedToken)}">here</a> to
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste this link in your browser<br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const info = await transport.sendMail(mailOptions)
        return info;
    } catch (error: any) {
        throw new Error(error.message)
    }
}