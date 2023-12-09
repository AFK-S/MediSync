import nodemailer from "nodemailer";

const RegisterationMail = (req, res) => {
  const { name, email_address, username, password } = req.data;
  const template = `
     <h3>${name} has been successfully registered.</h3>
     <div>Here are your Credentials for the Login:</div>
     <div><strong>UserName: ${username}<strong/></div>
     <div><strong>Password: ${password}<strong/></div>
    `;

  nodemailer
    .createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    .sendMail(
      {
        from: process.env.EMAIL_ID,
        to: email_address,
        subject: `${name} is Successfully Registered ✔`,
        html: template,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
};

export { RegisterationMail };
