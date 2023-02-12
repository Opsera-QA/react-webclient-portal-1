import React from "react";
import PropTypes from "prop-types";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ParameterSelectListInputBase from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInputBase";

function AzureCliInputParametersInput({ model, setModel, disabled, fieldName }) {

  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("enableInputParameters", !model.getData("enableInputParameters"));
    newDataObject.setDefaultValue("inputParameters");
    setModel({ ...newDataObject });
  };

  const getParametersInput = () => {
    if (model.getData("enableInputParameters") === true) {
      return (
        <ParameterSelectListInputBase
          titleIcon={faHandshake}
          dataObject={model}
          setDataObject={setModel}
          fieldName={"inputParameters"}
          type={"Parameter"}
          titleText={"Parameter Selection"}
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
        fieldName={"enableInputParameters"}
        disabled={disabled}
      />
      {getParametersInput()}
    </>
  );
}

AzureCliInputParametersInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


AzureCliInputParametersInput.defaultProps = {
  fieldName: "inputParameters"
};

export default AzureCliInputParametersInput;
