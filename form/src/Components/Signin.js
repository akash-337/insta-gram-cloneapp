import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import { UserContext } from "../App";

export default function Signin() {

  const css = {
    font: {
      fontFamily: "'Raleway', sans-serif",
    },
  };
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    const res = await fetch("http://localhost:5000/app/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      // window.alert("login successfull");
      navigate("/");
    }
  };

  return (
    <div style={{ placeSelf: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form method="POST">
          <Card className="w-96">
            <CardHeader color="lightBlue" size="xs">
              <H5 color="white" style={css.font}>Login</H5>
            </CardHeader>

            <CardBody>
              <div className="mt-4 mb-8 px-4" style={css.font}>
                <InputIcon
                  name="email"
                  value={userData.email}
                  onChange={handleInput}
                  type="text"
                  color="lightBlue"
                  placeholder="Email"
                  iconName="account_circle"
                />
              </div>
              <div className="mb-4 px-4" style={css.font}>
                <InputIcon
                  name="password"
                  value={userData.password}
                  onChange={handleInput}
                  type="password"
                  color="lightBlue"
                  placeholder="Password"
                  iconName="lock"
                />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-center">
                <Button
                style={css.font}
                  name="submit"
                  value="Submit"
                  type="submit"
                  color="lightBlue"
                  buttonType="link"
                  size="lg"
                  ripple="dark"
                  onClick={postData}
                >
                  Login
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
