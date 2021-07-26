import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const applicationPoolIdentityArray = [
  {name: "Application Pool Identity", value: "app_pool_identity"},
  {name: "Custom user", value: "custom_user"},
];

function IisPoolIdentityTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {

  const setDataFunction = (fieldName, identity) => {
    let newDataObject = dataObject;
    newDataObject.setData("applicationPoolIdentityType", identity.value);
    newDataObject.setData("applicationPoolIdentityUsername", "");
    newDataObject.setData("applicationPoolIdentityPassword", "");
    setDataObject({...newDataObject});
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={setDataFunction}
        setDataObject={setDataObject}
        selectOptions={applicationPoolIdentityArray}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select Application Pool Identity Type"}
        disabled={disabled}
      />
    </div>
  );
}

IisPoolIdentityTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

IisPoolIdentityTypeSelectInput.defaultProps = {
  fieldName: "applicationPoolIdentityType",
  valueField: "value",
  textField: "name"
};

export default IisPoolIdentityTypeSelectInput;