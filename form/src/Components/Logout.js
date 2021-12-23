import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/app/signout", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div
      style={{
        display: "flex",
        alignSelf: "center",
        height: "100px",
        width: "80vw",
        border: "1px solid lightgray",
        alignItems: "center",
        justifyContent: "center",
        background: "white"
      }}
    >
      <h1 style={{ fontSize: "30px", fontFamily: "'Raleway', sans-serif" }}>
        LOGGING OUT !!
      </h1>
    </div>
  );
};

export default Logout;
 