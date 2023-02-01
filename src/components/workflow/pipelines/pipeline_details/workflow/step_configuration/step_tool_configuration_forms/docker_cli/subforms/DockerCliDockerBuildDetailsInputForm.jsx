import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditableParameterMappingInput from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInput";
import DockerTagTypeSelectionInput 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/inputs/DockerTagTypeSelectionInput";
import DockerCliCommandLineInputParameterInput from "../inputs/DockerCliCommandLineInputParameterInput";


function DockerCliDockerBuildDetailsInputForm({ model, setModel, plan }) {

  const getDynamicTagNameField = () => {
    if (model?.getData("dockerTagType") === "other") {
      return (
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"dockerDynamicTagName"}
        />
      );
    }
  };

  const getDynamicDockerTagInput = () => {
    if (model?.getData("dynamicTag") === true) {
      return (
        <>
          <DockerTagTypeSelectionInput
            dataObject={model}
            setDataObject={setModel}
            fieldName={"dockerTagType"}
          />
          {getDynamicTagNameField()}
        </>
      );
    } else {
      return (
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"dockerTagName"}
        />
      );
    }
  };

  const getDockerTagInputs = () => {
    return (
      <>
        <BooleanToggleInput dataObject={model} setDataObject={setModel} fieldName={"dynamicTag"}/>
        {getDynamicDockerTagInput()}
      </>
    );
  };

  const getDynamicFields = () => {
    if (model?.getData("enableDockerBuild") === true) {
      return (
        <>
          <TextInputBase
            dataObject={model}
            setDataObject={setModel}
            fieldName={"inputFileName"}
          />
          <TextInputBase
            fieldName={"dockerName"}
            dataObject={model}
            setDataObject={setModel}
          />
          {getDockerTagInputs()}          
          <EditableParameterMappingInput
            model={model}
            setModel={setModel}
            fieldName={"buildArguments"}
            nameMaxLength={50}
            titleText={"Build Arguments Mapping"}
            type={"Build Argument"}
          />
          <DockerCliCommandLineInputParameterInput model={model} setModel={setModel} plan={plan} fieldName={"buildArguments"} subheaderText={"Build Arguments"} />
        </>
      );
    }
  };

  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setData("accountPassword", "");
    newModel.setData("secretAccessTokenKey", "");
    newModel.setData("userName", "");
    setModel({...newModel});
  };

  return (
    <>
      <BooleanToggleInput
        fieldName={"enableDockerBuild"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
      />      
      {getDynamicFields()}
    </>
  );
}

DockerCliDockerBuildDetailsInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  plan: PropTypes.any, 
};

export default DockerCliDockerBuildDetailsInputForm;
