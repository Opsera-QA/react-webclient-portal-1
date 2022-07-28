import React from "react";
import PropTypes from "prop-types";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import AzureConnectionStringInput from "./AzureConnectionStringInput";

function AzureConnectionStringsInput({ model, setModel, disabled, fieldName }) {

  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("connectionStringEnabled", !model.getData("connectionStringEnabled"));
    newDataObject.setDefaultValue("connectionStrings");
    setModel({ ...newDataObject });
  };

  const getConnectionStringsInput = () => {
    if (model.getData("connectionStringEnabled") === true) {
      return (
        <AzureConnectionStringInput
          titleIcon={faHandshake}
          dataObject={model}
          setDataObject={setModel}
          fieldName={fieldName}
          allowIncompleteItems={false}
          type={"Parameter Mappings"}
          regexValidationRequired={false}
          titleText={"Azure Connection Strings"}
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
        fieldName={"connectionStringEnabled"}
        disabled={disabled}
      />
      {getConnectionStringsInput()}
    </>
  );
}

AzureConnectionStringsInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


AzureConnectionStringsInput.defaultProps = {
  fieldName: "connectionStrings"
};

export default AzureConnectionStringsInput;
