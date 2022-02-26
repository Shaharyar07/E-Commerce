const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../Modals/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Authenticate = require("./middleware/authenticate");

//Key for encrypting the password
const key = "glitch";

//Register a new user -Sign Up
// POST /api/users/register
router.post(
  "/register",
  [
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Enter a valid Password, Min - 4 letters ").isLength({
      min: 4,
    }),
    body("username", "Name is too short, Enter a valid name!").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { username, email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({
          success,
          msg: "User already exists",
        });
      } else {
        const newUser = new User({
          username: username,
          email: email,
          password: CryptoJS.AES.encrypt(password, key),
        });
        newUser.save((err) => {
          if (err) {
            return res.status(500).json({
              success,
              error: "Something went wrong",
            });
          }
          success = true;
          return res.status(201).json({
            success,
            message: "User created successfully",
          });
        });
      }
    });
  }
);

//Login a user - Sign In
// POST /api/users/login
router.post(
  "/login",
  [
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Enter a valid Password, Min - 4 letters ").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({
          success,
          msg: "User does not exist",
        });
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        key
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedPassword !== password) {
        return res.status(400).json({
          success,
          msg: "Password is incorrect",
        });
      }
      success = true;
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, key);
      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        success,
        authToken,
        isAdmin: user.isAdmin,
      });
    });
  }
);

module.exports = router;
