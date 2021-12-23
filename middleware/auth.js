const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const Post = require("../model/postSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.instaclone;
    // req.body.token || req.query.token || req.headers["x-access-token"];
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
   
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("user not found");
    } else {
      req.token = token;
      req.rootUser = rootUser;
      req.UserID = rootUser._id;
    }
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

module.exports = auth;
