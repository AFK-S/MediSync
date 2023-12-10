import twilio from "twilio";

const client = twilio(
  "AC3102c1d9d0bf619aaf3b224196073a71",
  "a6c4a3cb50f39c6c754493c8900d6013"
);

const SendOTP = async (req, res) => {
  try {
    const { phone_number } = req.params;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone_number}`,
    });
    console.log("OTP sent via SMS:", message.sid);
    res
      .cookie("otp", otp, {
        maxAge: 1000 * 60 * 5,
      })
      .status(200)
      .end();
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

const VerifyOTP = async (req, res) => {
  const { otp } = req.cookies;
  const { otp: otpFromUser } = req.params;
  return res.send(otp !== otpFromUser);
};

export { SendOTP, VerifyOTP };
