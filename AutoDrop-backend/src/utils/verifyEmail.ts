import nodemailer from "nodemailer";
export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
export async function sendVerificationCode(email: string, code: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NodeMailerEmail,
      pass: process.env.NodeMailerPass,
    },
  });

  const mailOptions = {
    from: "support@autodrop.me",
    to: email,
    subject: "Verification Code",
    text: `Your verification code is ${code}`,
  };

  await transporter.sendMail(mailOptions);
}
