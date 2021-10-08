import "../../index.css";

import { Formik, useField } from "formik";

import React from "react";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="textInput" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextInput;
