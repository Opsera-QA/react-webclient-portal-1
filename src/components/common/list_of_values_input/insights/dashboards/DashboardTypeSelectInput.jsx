import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const dashboardTypes = [
  {value: "pipeline", text: "Pipeline"},
  {value: "planning", text: "Planning"},
  {value: "security", text: "Security"},
  {value: "quality", text: "Quality"},
  {value: "operations", text: "Operations"},
];

function DashboardTypeSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={dashboardTypes}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

DashboardTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

DashboardTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default DashboardTypeSelectInput;