import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { UserContext } from "../App";

const Home = () => {
  const css = {
    heading: {
      textAlign: "center",
      fontSize: "30px",
      marginBottom: "35px",
      marginTop: "35px",
      fontFamily: "'Raleway', sans-serif",
      border: "1px solid lightgray",
      background: "white",
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "80vw"
    },
  };
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const [noPost, setNoPost] = useState(false);
  const [posts, setPosts] = useState([]);

  const allPost = async () => {
    try {
      if (posts) {
        const res = await fetch("/app/allpost", {
          method: "GET",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (!data) {
          console.log("Retry");
        } else {
          dispatch({ type: "USER", payload: true });
          setPosts(data);
        }
      }
    } catch (error) {
      setNoPost(true);
      console.log(error);
    }
  };

  useEffect(() => {
    allPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPost = () => {
    if (posts) {
      fetch("/app/getpostdata", {
        method: "get",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            console.log(" post not found");
          } else {
            setPosts(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   getPost()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  return (
    <div>
      <div style={{ marginTop: "45px" }}>
        {noPost && <div style={css.heading}>LOGIN REQUIRED !!</div>}
        {posts &&
          posts.map((post, index) => (
            <Post
              key={index}
              id={index}
              username={post.username}
              caption={post.caption}
              photo={post.photo}
              postID={post._id}
              passedfuncton={getPost}
            />
          ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!noPost && <ImageUpload passedfuncton={getPost} bolean={noPost} />}
      </div>
    </div>
  );
};

export default Home;
