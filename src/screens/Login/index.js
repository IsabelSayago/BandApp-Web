import "../../index.css";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";

import Burger from "../../components/Burger";
import GlobalContext from "../../contexts/global";
import Menu from "../../components/Menu";
import TextInput from "../../components/TextInput";
import logo from "../../assets/logo.png";

// import { useAuth } from "../../components/ProvideAuth";

function Login() {
  const [open, setOpen] = useState(false);
  const { setAuthData, setAuthenticated } = useContext(GlobalContext);
  let history = useHistory();
  let location = useLocation();
  // let auth = useAuth();
  const URL_API = "https://apichathello.herokuapp.com/login";

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
            onSubmit={async (values, actions) => {
              const response = await fetch(URL_API, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              }).catch((err) => {
                if (err & err.message) {
                  console.log(err.message);
                }
              });
              if (response.ok) {
                const res = await response.json();
                localStorage.setItem("userData", JSON.stringify(res));
                setAuthData(res);
                setAuthenticated(true);
                redirectTo("/welcome");
              } else {
                alert("Invalid e-mail or password");
              }
              actions.resetForm();
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
