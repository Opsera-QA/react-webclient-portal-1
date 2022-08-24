import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import EditableParameterMappingInput from "components/common/list_of_values_input/parameters/EditableParameterMappingInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import _ from "lodash";

function DockerPreviousStepDataInputForm({ model, setModel, disabled, plan, stepId }) {

  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    if (plan && stepId) {
      let pipelineSteps = formatStepOptions(plan, stepId);
      let groupedSteps = _.groupBy(pipelineSteps, "tool.tool_identifier");
      let jenkinsSteps =
        Object.keys(groupedSteps).length > 0
          ? (groupedSteps.jenkins  || groupedSteps["command-line"])
            ? ( (groupedSteps.jenkins  && groupedSteps["command-line"]) ?  [...groupedSteps.jenkins, ...groupedSteps["command-line"]] : groupedSteps.jenkins ? groupedSteps.jenkins : groupedSteps["command-line"] ? groupedSteps["command-line"] 
            : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }]
             )
            : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }]
          : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }];
      
      setListOfSteps(jenkinsSteps);
    }
    setIsLoading(false);
  };

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
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
            selectOptions={listOfSteps ? listOfSteps : []}
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
