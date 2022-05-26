import React from "react";
import PropTypes from "prop-types";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import ParameterMappingInputBase from "components/common/list_of_values_input/parameters/ParameterMappingInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function EbsEnvironmentVariablesInput({ model, setModel, disabled }) {

  const getEnvironmentVariablesInput = () => {
    if (model?.getData("saveEnvironmentVariables") === true) {
      return (
        <ParameterMappingInputBase
          titleIcon={faHandshake}
          dataObject={model}
          setDataObject={setModel}
          fieldName={"environmentVariables"}
          allowIncompleteItems={true}
          type={"Environment Variables"}
          regexValidationRequired={false}
          titleText={"Environment Variable Mapping"}
        />
      );
    }    
  };  

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        fieldName={"saveEnvironmentVariables"}
        disabled={disabled}
      />
      {getEnvironmentVariablesInput()}
    </>
  );

}

EbsEnvironmentVariablesInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};


export default EbsEnvironmentVariablesInput;
