import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import EditableParameterMappingInput from "components/common/list_of_values_input/parameters/EditableParameterMappingInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import _ from "lodash";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

function DockerPreviousStepDataInputForm({ model, setModel, disabled, plan, stepId }) {

  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const jenkinsSteps = pipelineHelpers
      .getFilteredPreviousSteps(plan, stepId, [toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS, toolIdentifierConstants.TOOL_IDENTIFIERS.COMMAND_LINE]);
    setListOfSteps(jenkinsSteps);
    setIsLoading(false);
  };

  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("useBuildStepResource", !model.getData("useBuildStepResource"));
    newDataObject.setDefaultValue("environmentVariables");
    newDataObject.setDefaultValue("buildStepId");
    newDataObject.setDefaultValue("commands");
    setModel({ ...newDataObject });
  };

  const getPreviousStepInput = () => {
    if (model.getData("useBuildStepResource") === true) {
      return (
        <>
          <SelectInputBase
            setDataObject={setModel}
            textField={"name"}
            valueField={"_id"}
            dataObject={model}
            filter={"contains"}
            selectOptions={listOfSteps}
            fieldName={"buildStepId"}
            busy={isLoading}
          />
          <TextAreaInput
            dataObject={model}
            fieldName={"commands"}
            setDataObject={setModel}
          />
          <EditableParameterMappingInput
            model={model}
            setModel={setModel}
            fieldName={"environmentVariables"}
            nameMaxLength={50}
          />
        </>
      );
    }
  };

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={"useBuildStepResource"}
        disabled={disabled}
      />
      {getPreviousStepInput()}
    </>
  );
}

DockerPreviousStepDataInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};


DockerPreviousStepDataInputForm.defaultProps = {
  disabled: false
};

export default DockerPreviousStepDataInputForm;
