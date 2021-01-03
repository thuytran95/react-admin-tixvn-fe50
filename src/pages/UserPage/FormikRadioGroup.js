import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import React from "react";

const RadioField = ({
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
    <FormControl style={{ marginTop: "16px" }}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {children}
      </RadioGroup>
      <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
  );
};

export const FormikRadioGroup = (props) => {
  const { name, items, label, required = false } = props;
  return (
    <Field
      name={name}
      as={RadioField}
      label={label}
      errorString={<ErrorMessage name={name} />}
      required={required}
    >
      {items.map((item) => (
        <FormControlLabel
          key={item.value}
          value={item.value}
          control={<Radio />}
          label={item.label}
        />
      ))}
    </Field>
  );
};
