import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import "./Post.css";

const Post = ({ username, caption, photo, postID,passedfuncton }) => {
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

  const postComment = () => {
    fetch("/app/comment", {
      method: "put",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        postID,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        const data = result.comments;
        setComments(data);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = async () => {
    const confirm = window.confirm("Are you sure you want to Delete this post")
    if (confirm){
      try {
        const res = await fetch("http://localhost:5000/deletepost",{
          method:"DELETE",
          mode:"cors",
          headers:{
            "Content-Type": "application/json",
          },
          credentials:"include",
          body:JSON.stringify({
            postID
          })
        })
        await res.json()
        passedfuncton()
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <div className="post">
      {/* {header->avatar+username} */}
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div className="post_header">
          <Avatar className="post_avatar" alt="Remy Sharp" src="" />
          <h3>{username}</h3>
        </div>
        {/* <DeleteIcon/> */}
        <button type="button" onClick={deletePost} style={{ outline: "none", padding: "10px" }}>
          <ClearSharpIcon color="disabled" />
        </button>
      </div>
      {/* {image} */}
      <img className="post_image" src={photo} alt="post" />
      {/* {username+caption} */}
      <h4 className="post_text">
        <strong style={{ marginRight: "5px" }}>{username}</strong>
        {caption}
      </h4>
      <div className="post_comment">
        {comments.map((com) => {
          return (
            <>
              <p style={{ padding: "1px", paddingBottom: "2px" }} key="{com}">
                <strong style={{ marginRight: "5px" }}>{com.username}</strong>
                {com.comment}
              </p>
            </>
          );
        })}
      </div>
      <form
        className="post_commentBox"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="post_commentInput"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button className="post_commentbtn" type="submit" onClick={postComment}>
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
