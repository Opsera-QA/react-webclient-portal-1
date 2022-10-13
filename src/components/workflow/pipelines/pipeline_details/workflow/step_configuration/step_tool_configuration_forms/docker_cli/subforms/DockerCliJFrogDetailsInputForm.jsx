import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleRestrictedJFrogArtifactoryDockerToolSelectInput
  from "components/common/list_of_values_input/tools/jfrog/RoleRestrictedJFrogArtifactoryDockerToolSelectInput";
import JFrogRepositoryTypeSelectInput 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_docker/inputs/JFrogRepositoryTypeSelectInput";
import JfrogRepoSelectInput 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_docker/inputs/JfrogRepoSelectInput";
import pipelineHelpers from "components/workflow/pipelineHelpers";


function DockerCliJFrogDetailsInputForm({ model, setModel, stepId, plan }) {

  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(pipelineHelpers.formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const getDynamicFields = () => {

    if (model?.getData("type") == undefined || model?.getData("type") === "") {
      return null;
    }
    switch (model?.getData("type")) {
      case "PORTPERREPO":
        return (
          <TextInputBase 
            dataObject={model}             
            setDataObject={setModel} 
            fieldName="port"
          />
        );
      default:
        return (
          <JfrogRepoSelectInput
            fieldName={"repositoryName"}
            dataObject={model}
            setDataObject={setModel}
            options={listOfSteps}
            disabled={model && model.getData("jfrogToolConfigId")?.length === 0}
            tool_prop={
              model && model.getData("jfrogToolConfigId")
                ? model.getData("jfrogToolConfigId")
                : ""
            }
          />
        );
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("port");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("jfrogToolConfigId");
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("port");
    setModel({ ...newModel });
  };

  return (
    <>
      <RoleRestrictedJFrogArtifactoryDockerToolSelectInput
        fieldName={"jfrogToolConfigId"}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
      />
      <JFrogRepositoryTypeSelectInput
        dataObject={model}
        setDataObject={setModel}
      />
      {getDynamicFields()}
    </>
  );
}

DockerCliJFrogDetailsInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  stepId: PropTypes.string,
  plan: PropTypes.array,
};

export default DockerCliJFrogDetailsInputForm;
