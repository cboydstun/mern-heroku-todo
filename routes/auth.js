import express from "express";
const router = express.Router();
import User from "../models/User.js";
import validator from "express-validator";
const { check, validationResult } = validator;
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

//@GET - /api/auth - get users - Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@POST - /api/auth - login user with email and password
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      if (!(await user.comparePasswords(password))) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).json("server error");
    }
  }
);

export default router;