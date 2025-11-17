import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "andryariadi23@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendEmail = async ({ email, subject, text }: { email: string; subject: string; text: string }) => {
  const res = await transporter.sendMail({
    from: '"Luxora" <andryariadi23@gmail.com>',
    to: email,
    subject,
    text,
  });

  // console.log({ res, transporter }, "<---nodemailer");
};

export default sendEmail;
