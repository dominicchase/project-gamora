// TODO: user verification stuff to implement later

// const nodemailer = require("nodemailer");
// const { v4: uuidv4 } = require("uuid");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.AUTH_EMAIL,
//       pass: process.env.AUTH_PASS,
//     },
//   });

//   transporter.verify((error, success) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Ready for messages");
//     }
//   });

//   const handleVerification = ({ _id, email }, res) => {
//     const url = `${process.env.SERVER_URL}`;

//     const uniqueString = uuidv4() + _id;

//     const mailOptions = {
//       from: process.env.AUTH_EMAIL,
//       to: email,
//       subject: "Verify your email",
//       html: `<p>Verify your email address. This link expires in 6 hours. Click here to verify <a href=${url}user/verify/${_id}/${uniqueString}</p>`,
//     };
