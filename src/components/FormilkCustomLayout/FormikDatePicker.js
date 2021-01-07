import { DatePicker } from "material-ui-formik-components";
import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormikDatePicker = (props) => {
  const { name, value } = props.field;
  return (
    <DateView
      selected={value}
      name={name}
      onChange={(val) => props.setFieldValue(name, val)}
    />
  );
};

export { FormikDatePicker };
