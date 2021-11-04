import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import Burger from "../../components/Burger";
import GlobalContext from "../../contexts/global";
import Menu from "../../components/Menu";
import { ProvideAuth } from "../../components/ProvideAuth";
import TextInput from "../../components/TextInput";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const { setAuthData, setAuthenticated } = useContext(GlobalContext);

  const URL_API = "https://apichathello.herokuapp.com/signup";

  const redirectTo = (screen) => {
    history.push(screen);
  };

  const saveLocalStorage = (dataFromUser) => {
    return localStorage.setItem("userData", JSON.stringify(dataFromUser));
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
              name: "",
              email: "",
              password: "",
              passwordConfirmation: "",
              city: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .required("Required")
                .min(6, "Password must be at least 6 characters"),
              passwordConfirmation: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
              city: Yup.string().required("Required"),
            })}
            onSubmit={async (values, actions) => {
              const response = await fetch(URL_API, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstname: values.name,
                  surname: "Sayago",
                  email: values.email,
                  password: values.password,
                  instruments: [
                    { name: "Batería", active: true },
                    { name: "Bajo", active: false },
                  ],
                  genres: ["Rock", "Jazz"],
                  friends: ["i@i.com"],
                  bio: "Motos y música",
                }),
              }).catch((err) => {
                if (err & err.message) {
                  console.log(err.message);
                }
              });
              console.log(response);

              if (response.ok) {
                const res = await response.json();
                saveLocalStorage(res);
                console.log(res);
                setAuthData(res);
                setAuthenticated(true);
                /* setAuthData(res)
                setAuthenticated(true); */
                alert("Welcome to BandApp!");
              } else {
                alert("Email is being used.");
              }
              actions.resetForm();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                label="Name"
                name="name"
                type="text"
                placeholder=""
                labelSignUp={true}
              />

              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="email@address.com"
                labelSignUp={true}
              />

              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="********"
                labelSignUp={true}
              />

              <TextInput
                label="Confirm Password"
                name="passwordConfirmation"
                type="password"
                placeholder="********"
                labelSignUp={true}
              />

              <TextInput
                label="City"
                name="city"
                type="text"
                placeholder="Buenos Aires"
                labelSignUp={true}
              />

              <button className="signUpButton" type="submit">
                Create Account
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
