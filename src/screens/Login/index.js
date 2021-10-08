import "../../index.css";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import Burger from "../../components/Burger";
import Menu from "../../components/Menu";
import TextInput from "../../components/TextInput";

function Login() {
  const [open, setOpen] = useState(false);
  return (
    <div className="background">
      <div className="burgerMenu">
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
      <div className="divForm">
        <div className="form">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={{
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Required"),
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="email@address.com"
              />

              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="********"
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
