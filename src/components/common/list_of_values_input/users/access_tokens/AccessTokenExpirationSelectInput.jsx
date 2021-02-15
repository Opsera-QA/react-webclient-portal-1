import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const expirationLengths = [
  {text: "1 Week", value: "1w"},
  {text: "1 Month", value: "1mo"},
  {text: "2 Months", value: "2mo"},
  {text: "3 Months", value: "3mo"},
];

function AccessTokenExpirationSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={expirationLengths}
        valueField={"value"}
        showClearValueButton={false}
        textField={"text"}
        disabled={disabled}
      />
    </div>
  );
}

AccessTokenExpirationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

AccessTokenExpirationSelectInput.defaultProps = {
  fieldName: "expiration",
};

export default AccessTokenExpirationSelectInput;