import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const REQUEST_TYPE = [
  { value: "change_request", text: "Change Request" },
];

function ServiceNowTypeSelectInput({ fieldName, model, setModel, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={REQUEST_TYPE}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

ServiceNowTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ServiceNowTypeSelectInput;
