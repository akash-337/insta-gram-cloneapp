/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import Button from "@material-tailwind/react/Button";

const css = {
  card: {
    width: "39vw",
    minWidth: "24rem",
    height: "490px",
    boxShadow: "rgb(0 0 0) 0px 0px 27px -14px",
    background: "rgb(250, 250, 250)",
    border: "1px solid lightgray",
  },
  heading: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "9px",
  },
  inputbox: {
    display: "flex",
    gap: "8%",
    marginTop: "30px",
    justifyContent: "center",
    marginLeft: "4%",
    marginRight: "4%",
  },
  input: {
    width: "37%",
  },
};

const Contact = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const getData = async () => {
    try {
      const res = await fetch("/app/getdata", {
        method: "GET",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        const data = await res.json();
        setUserData({
          username: data.username,
          email: data.email,
          message: data.message,
        });
      }
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async (e) => {
    e.preventDefault();
    const { username, email, message } = userData;
    const res = await fetch("/feedback", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        email,
        message,
      }),
    });
    if (!res.ok) {
      console.log("message not sent");
      alert("message not sent");
    } else {
      alert("message sent");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <div style={{ placeSelf: "center"}}>
      <div style={css.card}>
        <div style={css.heading}>
          <h1 style={{color:"darkgray",fontSize:"30px",fontFamily: "'Raleway', sans-serif"}}>CONTACT US</h1>
        </div>

        <form method="GET" style={{ textAlign: "-webkit-center" }}>
          <div style={css.inputbox}>
            <div style={css.input}>
              <Input 
                style={{fontFamily: "'Raleway', sans-serif"}}
                type="text"
                name="username"
                value={userData.username}
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Username"
                onChange={handleInput}
              />
            </div>
            <div style={css.input}>
              <Input
              style={{fontFamily: "'Raleway', sans-serif"}}
                type="email"
                name="email"
                value={userData.email}
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Email"
                onChange={handleInput}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "35px",
              width: "75%",
              marginLeft: "4%",
              marginRight: "4%",
            }}
          >
            <Textarea
            style={{fontFamily: "'Raleway', sans-serif",color: "black"}}
              color="lightBlue"
              size="regular"
              name="message"
              value={userData.message}
              outline={true}
              placeholder="Type Your Feedback..."
              onChange={handleInput}
            />
          </div>
          <div style={{ marginTop: "18px" }}>
            <Button
            style={{fontFamily: "'Raleway', sans-serif"}}
              color="lightBlue"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
              onClick={postData}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
