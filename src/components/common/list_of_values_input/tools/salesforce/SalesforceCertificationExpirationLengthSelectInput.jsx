import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const CERTIFICATE_EXPIRATION_LENGTHS = [
  {text: "3 Months", value: "3mo"},
  {text: "1 Year", value: "1yr"},
  {text: "3 Years", value: "3yrs"},
  {text: "6 Years", value: "6yrs"},
];

function SalesforceCertificationExpirationLengthSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={CERTIFICATE_EXPIRATION_LENGTHS}
        valueField={"value"}
        showClearValueButton={false}
        textField={"text"}
        disabled={disabled}
      />
    </div>
  );
}

SalesforceCertificationExpirationLengthSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

SalesforceCertificationExpirationLengthSelectInput.defaultProps = {
  fieldName: "expiration",
};

export default SalesforceCertificationExpirationLengthSelectInput;