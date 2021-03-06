import React from "react";
import { ErrorMessage, Field } from "formik";
import { TextField } from "@material-ui/core";
/**
 * Material TextField Component with Formik Support including Errors.
 * Intended to be specified via the `component` prop in a Formik <Field> or <FastField> component.
 * Material-UI specific props are passed through.
 */

export const FormikTextField = (props) => {
  const { name, label, required = false, type, disabled } = props;

  return (
    <Field
      required={required}
      as={TextField}
      label={label}
      name={name}
      type={type}
      fullWidth
      disabled={disabled}
      variant="outlined"
      helperText={<ErrorMessage name={name} />}
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
      variant="outlined"
      helperText={<ErrorMessage name={name} />}
    />
  );
};
