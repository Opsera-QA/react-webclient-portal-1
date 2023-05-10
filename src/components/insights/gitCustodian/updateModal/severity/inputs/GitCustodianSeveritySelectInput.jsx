import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SEVERITY = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

function GitCustodianSeveritySelectInput({ model, setModel, disabled }) {

  return (
    <SelectInputBase
      dataObject={model}  
      setDataObject={setModel}           
      selectOptions={SEVERITY}
      fieldName={"severity"}
      disabled={disabled}
    />
  );
}

GitCustodianSeveritySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitCustodianSeveritySelectInput;
