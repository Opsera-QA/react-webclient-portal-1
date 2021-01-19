import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const idpVendors = [
  {text: "OKTA", value: "OKTA"},
  {text: "GOOGLE", value: "GOOGLE"},
  {text: "FACEBOOK", value: "FACEBOOK"},
  {text: "LINKEDIN", value: "LINKEDIN"},
  {text: "MICROSOFT", value: "MICROSOFT"},
  {text: "APPLE", value: "APPLE"},
  {text: "SAML 2.0 IdP", value: "SAML2.0IDP"},
  {text: "OpenID Connect IdP", value: "OPENIDCONNECTIDP"},
];

function IdpVendorSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={idpVendors}
      valueField={valueField}
      textField={textField}
      // placeholderText={placeholderText}
      disabled={disabled}
    />
  );
}

IdpVendorSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

IdpVendorSelectInput.defaultProps = {
  valueField: "value",
  textField: "text"
};

export default IdpVendorSelectInput;