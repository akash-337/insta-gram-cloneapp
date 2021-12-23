const express = require("express");
const User = require("../model/userSchema");
const Post = require("../model/postSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("../DB/conn");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { username, email, phone, password, cpassword } = req.body;
  if (!username || !email || !phone || !password || !cpassword) {
    return res.status(400).json({ error: "field empty" });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    } else if (password != cpassword) {
      return res.status(400).json({ error: "Password not match" });
    } else {
      const user = new User({ username, email, phone, password, cpassword });
      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "Registered successfully" });
      } else {
        res.status(500).json({ error: "error while saving" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "field empty" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        const token = await userLogin.generateAuthToken();
        res.cookie("instaclone", token, {
          expires: new Date(Date.now() + 25892000),
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });
        res.status(200).json({ message: "User login successfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getdata", auth, (req, res) => {
  res.send(req.rootUser);
});

router.post("/feedback", auth, async (req, res) => {
  try {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
      return res.json({ error: "field empty" });
    }
    const userContact = await User.findOne({ email: email });
    if (userContact) {
      await userContact.addMessage(username, email, message);
      await userContact.save();
      res.status(201).json({ message: "Feedback sent" });
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/createpost", auth, async (req, res) => {
  const { caption, imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: "Plase add all the fields" });
  }
  const username = req.rootUser.username;
  const userID = req.UserID;
  const post = new Post({
    caption,
    photo: imageUrl,
    username,
    userID,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((error) => {
      console.error(error);
    });
});

router.put("/comment", auth, async (req, res) => {
  try {
    const username = req.rootUser.username;
    const { comment, postID } = req.body;
    if (!username || !comment || !postID) {
      return res.json({ error: "invalid poct comment" });
    }
    const update = { username, comment };
    const userComment = await Post.findByIdAndUpdate(
      postID,
      {
        $push: { comments: update },
      },
      {
        new: true,
      }
    );
    res.send(userComment);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getpostdata", auth, async (req, res) => {
  const id = req.UserID;
  const userPost = await Post.find({
    userID: id,
  }).sort("-createdAt");
  res.status(200).json(userPost);
  // console.log("userPost>>>",userPost);
});

router.get("/allpost", auth, async (req, res) => {
  const posts = await Post.find().sort("-createdAt");
  res.send(posts);
});

router.get("/signout", auth, async (req, res) => {
  try {
    res.clearCookie("instaclone");
    req.rootUser.tokens = req.rootUser.tokens.filter((currtoken) => {
      return currtoken.token !== req.token;
    });
    await req.rootUser.save();
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deletepost",auth,async(req,res)=>{
  try {
    const postID = req.body
    const del = await Post.findOneAndDelete(postID)
    res.send(del)
    console.log(Post.userID);
  } catch (error) {
    console.log(error);
  }
  //   // Post.
  //   // postuserID=authreq.UserID
  //   // delete POst _id
})

module.exports = router;
