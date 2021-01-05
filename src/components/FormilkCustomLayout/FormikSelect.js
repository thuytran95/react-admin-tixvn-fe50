import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import React from "react";

const SelectField = ({
  errorString,
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
  required,
}) => {
  return (
    <FormControl style={{ display: "block" }}>
      <InputLabel style={{ fontSize: "20px" }}>{label}</InputLabel>
      <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
        {children}
      </Select>
      <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
  );
};

export const FormikSelect = (props) => {
  const { value, name, items, label, required = false } = props;
  return (
    <Field
      name={name}
      as={SelectField}
      label={label}
      errorString={<ErrorMessage name={name} />}
      required={required}
      value={value}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Field>
  );
};
