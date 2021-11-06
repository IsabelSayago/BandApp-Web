import "../../index.css";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";

import Burger from "../../components/Burger";
import Menu from "../../components/Menu";
import TextInput from "../../components/TextInput";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router";

const Recovery = () => {
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const redirectTo = (screen) => {
    history.push(screen);
  };
  return (
    <div className="backgroundWhite">
      <div className="burgerMenu">
        <Burger open={open} setOpen={setOpen} recovery={true} />
        <Menu open={open} setOpen={setOpen} recovery={true} />
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
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            })}
            onSubmit={(values, actions) => {
              alert("Recovery e-mail has been sent");
              actions.resetForm();
              redirectTo("/");
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
                label="Recover password"
                name="email"
                type="email"
                placeholder="Type your e-mail"
                labelLogin={true}
              />
              <button type="submit" className="recoverButton">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
