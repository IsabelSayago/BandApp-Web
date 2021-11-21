import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import Burger from "../../components/Burger";
import { FiPlusCircle } from "react-icons/fi";
import GlobalContext from "../../contexts/global";
import Menu from "../../components/Menu";
import TextInput from "../../components/TextInput";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const [instruments, setInstruments] = useState([]);

  const { setAuthData, setAuthenticated } = useContext(GlobalContext);

  const URL_API_BAND = "https://band-app-back.herokuapp.com/users";

  const redirectTo = (screen) => {
    history.push(screen);
  };

  const addInstrument = () => {
    const name = window.prompt("Type instrument");
    if (name) {
      const instrumentCreated = { id: uuidv4(), name: name, active: true };
      setInstruments((prev) => [...prev, instrumentCreated]);
    }
  };

  const deleteInstrument = (id) => {
    return setInstruments((prev) => prev.filter((obj) => obj.id !== id));
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
              instruments: [],
              expanded: false,
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
              const response = await fetch(URL_API_BAND, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstname: values.name,
                  city: values.city,
                  email: values.email,
                  password: values.password,
                  surname: values.name,
                  instruments: instruments,
                  friends: [],
                  genres: [],
                  bio: "This is your intro",
                  expanded: values.expanded,
                }),
              }).catch((err) => {
                if (err & err.message) {
                  console.log(err.message);
                }
              });
              console.log(response);

              if (response.ok) {
                const res = await response.json();
                setAuthenticated(true);
                console.log(res);
                localStorage.setItem("userData", JSON.stringify(res));
                setAuthData(res);

                alert("Welcome to BandApp!");
                redirectTo("/welcome");
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

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "14rem",
                }}
              >
                <label className="labelInstruments" htmlFor="">
                  Instruments
                </label>
                <button className="buttonAddInstrument" onClick={addInstrument}>
                  <FiPlusCircle style={{ height: "1.5rem", width: "1.5rem" }} />
                </button>
              </div>

              {instruments.length > 0 ? (
                <div className="addInstrument">
                  {instruments.map((instrument) => (
                    <button
                      key={instrument.id}
                      className="activeInstrument"
                      style={
                        instrument.active
                          ? { backgroundColor: "#9c4848" }
                          : {
                              backgroundColor: "white",
                              color: "#9c4848",
                              fontWeight: "bold",
                              border: "solid",
                              borderWidth: "0.1rem",
                              borderColor: "grey",
                            }
                      }
                      onClick={() => deleteInstrument(instrument.id)}
                    >
                      {instrument.name}
                    </button>
                  ))}
                </div>
              ) : (
                <h6
                  style={{
                    marginBottom: "0.2rem",
                    fontFamily: "Roboto",
                    marginTop: "0rem",
                  }}
                >
                  - No instruments added -
                </h6>
              )}

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
