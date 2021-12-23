import React, { useContext, useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import { NavLink } from "react-router-dom";
import Icon from "@material-tailwind/react/Icon";
import NavItem from "@material-tailwind/react/NavItem";
import { UserContext } from "../App";
import logo from "../Image/logo.png";

export default function NavBar() {
  const css = {
    navitem: {
      color: "black",
    },
  };
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const Togglenavbar = () => {
    if (state) {
      return (
        <>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#cacaca" : "",
              };
            }}
          >
            <NavItem ripple="light" style={css.navitem}>
              <Icon name="home" size="xl" />
              FEED
            </NavItem>
          </NavLink>

          <NavLink
            to="/contact"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#cacaca" : "",
              };
            }}
          >
            <NavItem ripple="light" style={css.navitem}>
              <Icon name="phone" size="xl" />
              Contact
            </NavItem>
          </NavLink>

          <NavLink
            to="/logout"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#cacaca" : "",
              };
            }}
          >
            <NavItem ripple="light" style={css.navitem}>
              <Icon name="settings" size="xl" />
              Logout
            </NavItem>
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#cacaca" : "",
              };
            }}
          >
            <NavItem ripple="light" style={css.navitem}>
              <Icon name="home" size="xl" />
              FEED
            </NavItem>
          </NavLink>

          <NavLink
            to="/signin"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#cacaca" : "",
              };
            }}
          >
            <NavItem ripple="light" style={css.navitem}>
              <Icon name="account_circle" size="xl" />
              login
            </NavItem>
          </NavLink>
          <NavLink
            to="/signup"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#cacaca" : "",
              };
            }}
          >
            <NavItem ripple="light" style={css.navitem}>
              <Icon name="settings" size="xl" />
              Sign Up
            </NavItem>
          </NavLink>
        </>
      );
    }
  };

  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid lightgray", marginTop: "10px" }}>
      <Navbar color="white" navbar>
        <NavbarContainer>
          <NavbarWrapper>
            <NavbarBrand>
              <img style={{ objectFit: "contain" }} src={logo} alt="LOGO" />
            </NavbarBrand>
            <NavbarToggler
              color="gray"
              onClick={() => setOpenNavbar(!openNavbar)}
              ripple="light"
            />
          </NavbarWrapper>

          <NavbarCollapse open={openNavbar}>
            <Nav>
              <Togglenavbar />
            </Nav>
          </NavbarCollapse>
        </NavbarContainer>
      </Navbar>
    </div>
  );
}
