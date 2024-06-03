const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const emailController = async (req, res) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const { user_email, user_subject, user_name, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USERNAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `${user_name} ${user_email}`,
      to: "sparrowthedev@gmail.com",
      subject: user_subject,
      html: `<b><p>${message}</p>
      <p>Yours Sincerely: ${user_name}</p>
      <p>My Email: ${user_email}</p>
      </b>`,
    };

    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(`here is the error: ${error}`);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const result = await transporter.sendMail(mailOptions);
    console.log(result);
    if (result.response.includes("OK")) {
      res.status(200).json({ message: "email sent succesfully!!" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = emailController;
