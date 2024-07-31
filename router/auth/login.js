import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usermodel } from "../../db.utils/model.js";

const LoginRouter = express.Router();

LoginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Request:", req.body);

  try {
      const user = await Usermodel.findOne({ email });
      console.log("User Record:", user);

      if (!user) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }
      if (!user.isActive) {
          return res.status(400).json({ msg: 'Please activate your account' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch);
      if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log("Generated Token:", token);
      res.json({ token });
  } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ msg: 'Server error' });
  }
});


// Middleware to set Cache-Control header
LoginRouter.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

export default LoginRouter;
