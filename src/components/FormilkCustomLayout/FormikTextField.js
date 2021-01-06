import React from "react";
import { ErrorMessage, Field } from "formik";
import { TextField } from "@material-ui/core";
/**
 * Material TextField Component with Formik Support including Errors.
 * Intended to be specified via the `component` prop in a Formik <Field> or <FastField> component.
 * Material-UI specific props are passed through.
 */

export const FormikTextField = (props) => {
  const { name, label, required = false, type } = props;

  return (
    <Field
      required={required}
      as={TextField}
      label={label}
      name={name}
      type={type}
      fullWidth
      helperText={<ErrorMessage style={{ color: "green" }} name={name} />}
    />
  );
};

export const FormikTextFieldMultiline = (props) => {
  const { name, label, rows, required = false, type } = props;

  return (
    <Field
      required={required}
      as={TextField}
      label={label}
      name={name}
      type={type}
      fullWidth
      multiline
      rows={rows}
      helperText={<ErrorMessage style={{ color: "green" }} name={name} />}
    />
  );
};
