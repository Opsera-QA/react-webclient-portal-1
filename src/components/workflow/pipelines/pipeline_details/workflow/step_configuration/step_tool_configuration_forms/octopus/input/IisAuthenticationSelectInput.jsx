import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

const authenticationType = [
  {name: "Anonymous Authentication", value: "EnableAnonymousAuthentication"},
  {name: "Basic Authentication", value: "EnableBasicAuthentication"},
  {name: "Windows Authentication", value: "EnableWindowsAuthentication"},
];

function IisAuthenticationSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {

  return (
    <div>
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={authenticationType}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select IIS Authentication"}
        disabled={disabled}
      />
    </div>
  );
}

IisAuthenticationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

IisAuthenticationSelectInput.defaultProps = {
  fieldName: "iisAuthentication",
  valueField: "value",
  textField: "name"
};

export default IisAuthenticationSelectInput;