import "../../index.css";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

import Burger from "../../components/Burger";
import Menu from "../../components/Menu";
import TextInput from "../../components/TextInput";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import logo from "../../assets/logo.png";
import { useAuth } from "../../components/ProvideAuth";

function Login() {
  const [open, setOpen] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  const redirectTo = (screen) => {
    history.push(screen);
  };
  return (
    <div className="background">
      <div className="burgerMenu">
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
      <button
        className="loginPicture"
        style={{
          backgroundImage: `url(${logo})`,
        }}
        onClick={() => redirectTo("/")}
      />
      <div className="divForm">
        <div className="form">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={() => {
              auth.signin(() => {
                alert("hi");
              });
            }}
          >
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="email@address.com"
                labelLogin={true}
              />

              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                labelLogin={true}
              />

              <button className="loginButton" type="submit">
                {" "}
                Let's play!
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
