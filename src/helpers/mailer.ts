import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any) =>{

    try {

        const hashToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType == "VERIFY"){
            // ONE store in db and one send to user.
            await User.findByIdAndUpdate(userId, 
              {
               $set:{
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
               }
              })
        }
        else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId, 
            {
              $set:{
                forgotPasswordToken: hashToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
              }
            })
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
        // copied from mail trap.
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "0006ccc8ab8acd", // this should be not here
            pass: "ff96d177178b76"  // this should be not here
          }
        });

        const verifyEmailHTML = `
        <p>
          Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to verify your email
          or copy and paste the link below in your browser.<br>
          ${process.env.DOMAIN}/verifyemail?token=${hashToken}
        </p>`;
  
      const resetEmailHTML = `
        <p>
          Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashToken}">here</a> to reset your password
          or copy and paste the link below in your browser.<br>
          ${process.env.DOMAIN}/resetpassword?token=${hashToken}
        </p>`;


    // Set email content based on the email type
    const emailContent = emailType === 'VERIFY' ? verifyEmailHTML : resetEmailHTML;

        // copied from nodemailer documentation
        const mailOption = {
          from: 'saif@gmail.com', 
          to: email, 
          subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
          html:emailContent,
        }

        const mailResponse =   await transport.sendMail(mailOption)
        return mailResponse



    } catch (error:any) {
        throw new Error(error.message)
    }
}