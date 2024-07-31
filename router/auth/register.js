import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import crypto from "crypto";  
import { Usermodel } from "../../db.utils/model.js";
import { transport } from "../../mail.util.js";

dotenv.config();

const RegisterRouter = express.Router();

// Email configuration


RegisterRouter.post("/", async (req, res) => {
  const { email, password, phone, name } = req.body;

  try {
    if (!email || !password || !phone || !name) {
      return res.status(400).json({ msg: "Name, email, password, and phone are required" });
    }

    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Usermodel({
      name,
      email,
      phone,
      password: hashedPassword,
      isActive: false,
    });

    const activationToken = crypto.randomBytes(20).toString('hex');
    user.activationToken = activationToken;
    user.activationExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const activationLink = `${process.env.FRONTEND_URL}/activate/${activationToken}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Account Activation',
      text: `Please click the following link to activate your account: ${activationLink}`,
    };

    await transport.sendMail(mailOptions);

    res.status(200).json({ msg: 'Activation email sent', email: user.email });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default RegisterRouter;
