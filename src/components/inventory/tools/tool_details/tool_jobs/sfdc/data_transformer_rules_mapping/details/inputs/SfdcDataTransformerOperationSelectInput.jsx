import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const OPERATIONS = [
  { text: "Search & Replace", value: "search_and_replace" },
  { text: "Exclude", value: "exclude" }
];

function SfdcDataTransformerOperationSelectInput({ fieldName, model, setModel, disabled }) {

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}      
      selectOptions={OPERATIONS}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

SfdcDataTransformerOperationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SfdcDataTransformerOperationSelectInput.defaultProps = {
  fieldName: "operation"
};

export default SfdcDataTransformerOperationSelectInput;
