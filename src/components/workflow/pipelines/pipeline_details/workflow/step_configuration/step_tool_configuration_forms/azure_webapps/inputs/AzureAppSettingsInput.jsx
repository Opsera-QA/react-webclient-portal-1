import React from "react";
import PropTypes from "prop-types";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ParameterMappingInputBase from "components/common/list_of_values_input/parameters/ParameterMappingInputBase";

function AzureAppSettingsInput({ model, setModel, disabled, fieldName }) {

  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("appSettingsEnabled", !model.getData("appSettingsEnabled"));
    newDataObject.setDefaultValue("appSettings");
    setModel({ ...newDataObject });
  };

  const getAppSettingsInput = () => {
    if (model.getData("appSettingsEnabled") === true) {
      return (
        <ParameterMappingInputBase
          titleIcon={faHandshake}
          dataObject={model}
          setDataObject={setModel}
          fieldName={fieldName}
          allowIncompleteItems={false}
          type={"Parameter Mappings"}
          regexValidationRequired={false}
          titleText={"Azure App Settings"}
        />
      );
    }
  };

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={"appSettingsEnabled"}
        disabled={disabled}
      />
      {getAppSettingsInput()}
    </>
  );
}

AzureAppSettingsInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


AzureAppSettingsInput.defaultProps = {
  fieldName: "appSettings"
};

export default AzureAppSettingsInput;
