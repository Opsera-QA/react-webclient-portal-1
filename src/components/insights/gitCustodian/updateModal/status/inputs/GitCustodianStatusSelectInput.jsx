import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const STATUS = [
  "Open",
  "Resolved",
  "False Positive",
];

function GitCustodianStatusSelectInput({ model, setModel, disabled }) {

  return (
    <SelectInputBase
      dataObject={model}  
      setDataObject={setModel}           
      selectOptions={STATUS}
      fieldName={"status"}
      disabled={disabled}
    />
  );
}

GitCustodianStatusSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitCustodianStatusSelectInput;
