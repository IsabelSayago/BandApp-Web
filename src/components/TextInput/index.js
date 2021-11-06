import "../../index.css";

import React from "react";
import { useField } from "formik";

const TextInput = ({ label, labelLogin, labelSignUp, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        className={labelLogin ? "labelLogin" : "labelSignUp"}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input className="textInput" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div
          className="error"
          style={labelSignUp ? { color: "#9c4848" } : { color: "#9c4848" }}
        >
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export default TextInput;
