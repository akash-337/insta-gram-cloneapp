import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Logout from "./Components/Logout";
import Contact from "./Components/Contact";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import NavBar from "./Components/NavBar";
import "@material-tailwind/react/tailwind.css";
import { initialState, reducer } from "./Components/reducer/UseReducer";

const css = {
  body: {
    minHeight: "91.5vh",
    height: "100%",
    margin: "0",
    background: "#fafafa",
    display: "flex",
    justifyContent: "center",
  },
};

export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <NavBar />
        <div style={css.body}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
