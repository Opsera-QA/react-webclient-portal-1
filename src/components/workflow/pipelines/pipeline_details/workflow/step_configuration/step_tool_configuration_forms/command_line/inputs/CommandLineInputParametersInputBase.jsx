import React from "react";
import PropTypes from "prop-types";
import {faBracketsCurly, faHandshake} from "@fortawesome/pro-light-svg-icons";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/ParameterSelectListInputBase";
import EditableParameterMappingInput
  from "components/common/list_of_values_input/parameters/EditableParameterMappingInput";
import InfoContainer from "components/common/containers/InfoContainer";

function CommandLineInputParametersInputBase(
  {
    model,
    setModel,
    disabled,
    plan,
  }) {
  const setDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData("saveEnvironmentVariables", !model.getData("saveEnvironmentVariables"));
    newDataObject.setDefaultValue("environmentVariables");
    newDataObject.setDefaultValue("customParameters");
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model.getData("saveEnvironmentVariables") === true) {
      return (
        <EditableParameterMappingInput
          model={model}
          setModel={setModel}
          fieldName={"environmentVariables"}
          nameMaxLength={50}
        />
      );
    }

    return (
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={model}
        setDataObject={setModel}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Input Parameters"}
        plan={plan}
        tool_prop={model?.getData("terraformStepId") && model?.getData("terraformStepId").length > 0 ? model?.getData("terraformStepId") : ""}
      />
    );
  };

  const getRightSideButtons = () => {
    return (
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={"saveEnvironmentVariables"}
        disabled={disabled}
      />
    );
  };

  return (
    <InfoContainer
      titleText={"Input Parameters"}
      titleIcon={faBracketsCurly}
      titleRightSideButton={getRightSideButtons()}
    >
      {getParametersInput()}
    </InfoContainer>
  );
}

CommandLineInputParametersInputBase.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
};


CommandLineInputParametersInputBase.defaultProps = {
  fieldName: "environmentVariables",
};
