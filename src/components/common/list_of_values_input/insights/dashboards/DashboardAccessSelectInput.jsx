import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const dashboardAccess = [
  {value: "private", text: "Private"},
  {value: "public", text: "My Organization"}
];

function DashboardAccessSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dashboardAccess}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

DashboardAccessSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

DashboardAccessSelectInput.defaultProps = {
  fieldName: "visibility",
};

export default DashboardAccessSelectInput;