const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

getLoggedIn = async (req, res) => {
  auth.verify(req, res, async function () {
    const loggedInUser = await User.findOne({ _id: req.userId });
    return res
      .status(200)
      .json({
        loggedIn: true,
        user: {
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          email: loggedInUser.email,
          username: loggedInUser.username,
        },
      })
      .send();
  });
};

login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });
  }
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).json({ errorMessage: "1" });
  }
  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(400).json({ errorMessage: "1" });
  }

  const token = auth.signToken(user);

  await res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    })
    .send();
};

logoutUser = async (req, res) => {
  await res
    .cookie("token", null, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .send();
};
registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordVerify, username } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordVerify ||
      !username
    ) {
      return res.status(400).json({ errorMessage: "1" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "2",
      });
    }
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "3",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "4",
      });
    }

    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        errorMessage: "5",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      username,
    });
    const savedUser = await newUser.save();

    // LOGIN THE USER
    const token = auth.signToken(savedUser);

    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          username: savedUser.username,
        },
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getLoggedIn,
  registerUser,
  login,
  logoutUser,
};
