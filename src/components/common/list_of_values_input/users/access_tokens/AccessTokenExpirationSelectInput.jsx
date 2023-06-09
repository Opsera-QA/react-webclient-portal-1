import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import accesssTokenExpirationLengthConstants from "@opsera/definitions/constants/access_tokens/accessTokenExpirationLength.constants"

const selectOptions = accesssTokenExpirationLengthConstants.EXPIRATION_LENGTH_SELECT_OPTIONS

function AccessTokenExpirationSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={selectOptions}
      valueField={"value"}
      showClearValueButton={false}
      textField={"text"}
      disabled={disabled}
    />
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