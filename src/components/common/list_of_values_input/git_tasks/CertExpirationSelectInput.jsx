import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const expirationLengths = [
  {text: "3 Months", value: "3mo"},
  {text: "1 Year", value: "1yr"},
  {text: "3 Years", value: "3yrs"},
  {text: "6 Years", value: "6yrs"},
];

function CertExpirationSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
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

CertExpirationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

CertExpirationSelectInput.defaultProps = {
  fieldName: "expiration",
};

export default CertExpirationSelectInput;