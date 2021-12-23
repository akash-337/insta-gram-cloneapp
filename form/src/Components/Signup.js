import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";

export default function Signup() {
  const css = {
    font: {
      fontFamily: "'Raleway', sans-serif",
    },
  };
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { username, email, phone, password, cpassword } = userData;
    const res = await fetch("/app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("invalid registration");
      console.log(data);
    } else {
      window.alert("registration successfull");
      navigate("/signin");
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
              <H5 color="white" style={css.font}>
                Register
              </H5>
            </CardHeader>

            <CardBody>
              <div className="mt-4 mb-8 px-4" style={css.font}>
                <InputIcon
                  name="username"
                  value={userData.username}
                  onChange={handleInput}
                  type="name"
                  id="name"
                  color="lightBlue"
                  placeholder="Username"
                  iconName="account_circle"
                />
              </div>
              <div className="mb-8 px-4" style={css.font}>
                <InputIcon
                  name="email"
                  id="email"
                  value={userData.email}
                  onChange={handleInput}
                  type="email"
                  color="lightBlue"
                  placeholder="Email Address"
                  iconName="email"
                />
              </div>
              <div className="mt-4 mb-8 px-4" style={css.font}>
                <InputIcon
                  name="phone"
                  id="phone"
                  value={userData.phone}
                  onChange={handleInput}
                  type="number"
                  color="lightBlue"
                  placeholder="Phone"
                  iconName="phone"
                />
              </div>
              <div className="mb-8 px-4" style={css.font}>
                <InputIcon
                  name="password"
                  id="password"
                  value={userData.password}
                  onChange={handleInput}
                  type="password"
                  color="lightBlue"
                  placeholder="Password"
                  iconName="lock"
                />
              </div>
              <div className="mb-4 px-4" style={css.font}>
                <InputIcon
                  name="cpassword"
                  id="cpassword"
                  value={userData.cpassword}
                  onChange={handleInput}
                  type="password"
                  color="lightBlue"
                  placeholder="Confirm Password"
                  iconName="lock"
                />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-center">
                <Button
                  style={css.font}
                  name="submit"
                  id="submit"
                  value="Submit"
                  type="submit"
                  color="lightBlue"
                  buttonType="link"
                  size="lg"
                  ripple="dark"
                  onClick={postData}
                >
                  SIGN UP
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
