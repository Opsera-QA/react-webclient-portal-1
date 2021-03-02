import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const dashboardPersonas = [
  {value: "developer", text: "Developer"},
  {value: "manager", text: "Manager"},
  {value: "executive", text: "Executive"},
];

function DashboardPersonaSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dashboardPersonas}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

DashboardPersonaSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

DashboardPersonaSelectInput.defaultProps = {
  fieldName: "persona",
};

export default DashboardPersonaSelectInput;