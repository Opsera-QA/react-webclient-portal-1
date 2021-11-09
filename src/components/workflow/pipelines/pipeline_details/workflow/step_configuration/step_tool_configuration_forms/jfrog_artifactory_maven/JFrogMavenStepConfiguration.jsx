import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import JfrogMavenStepJfrogArtifactoryMavenToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_maven/inputs/JfrogMavenStepJfrogArtifactoryMavenToolSelectInput";
import JFrogMavenBuildStepSelectInput from "./inputs/JFrogMavenBuildStepSelectInput";
import JfrogMavenRepoSelectInput from "./inputs/JfrogMavenRepoSelectInput";
import jfrogMavenStepFormMetadata from "./jfrog-maven-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import JFrogMavenStepTypeSelectInput from "./inputs/JFrogMavenStepTypeSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import JFrogRepositoryFormatSelectInput from "./inputs/JFrogRepositoryFormatSelectInput";

function JFrogMavenStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, plan, parentCallback }) {

  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [jfrogStepConfigurationDto, setJFrogStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {    
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    return STEP_OPTIONS;
  };

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let jfrogConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, jfrogMavenStepFormMetadata);

    setJFrogStepConfigurationDataDto(jfrogConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = jfrogStepConfigurationDto;
    const packageId = jfrogStepConfigurationDto.getData("groupName") + ":" + jfrogStepConfigurationDto.getData("artifactName");
    newDataObject.setData("packageId", packageId);
    setJFrogStepConfigurationDataDto({...newDataObject});
    const item = {
      configuration: jfrogStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };

  if (isLoading || jfrogStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={jfrogStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <JfrogMavenStepJfrogArtifactoryMavenToolSelectInput
        model={jfrogStepConfigurationDto}
        setModel={setJFrogStepConfigurationDataDto}
      />
      <JFrogMavenStepTypeSelectInput dataObject={jfrogStepConfigurationDto} setDataObject={setJFrogStepConfigurationDataDto} />
      <JFrogRepositoryFormatSelectInput dataObject={jfrogStepConfigurationDto} setDataObject={setJFrogStepConfigurationDataDto} />
      <JfrogMavenRepoSelectInput
        fieldName={"repositoryName"}
        dataObject={jfrogStepConfigurationDto}
        setDataObject={setJFrogStepConfigurationDataDto}
        options={listOfSteps}
        disabled={jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("jfrogToolConfigId")?.length === 0}
        tool_prop={
          jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("jfrogToolConfigId")
            ? jfrogStepConfigurationDto.getData("jfrogToolConfigId")
            : ""
        }
      />
      {jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("repositoryFormat") === "Maven" &&
        <>
          <TextInputBase                      
            setDataObject={setJFrogStepConfigurationDataDto}
            dataObject={jfrogStepConfigurationDto}
            fieldName={"groupName"}
            key="groupName"
          />
          <TextInputBase                      
            setDataObject={setJFrogStepConfigurationDataDto}
            dataObject={jfrogStepConfigurationDto}
            fieldName={"artifactName"}
            key="artifactName"
          />
          <BooleanToggleInput 
            dataObject={jfrogStepConfigurationDto} 
            setDataObject={setJFrogStepConfigurationDataDto} 
            fieldName={"customVersion"} 
          />  
        </>
      }
      {jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("repositoryFormat") === "NuGet" &&
        <>
          <TextInputBase                      
            setDataObject={setJFrogStepConfigurationDataDto}
            dataObject={jfrogStepConfigurationDto}
            fieldName={"serverPath"}
            key="serverPath"
          />
        </>
      }
      <JFrogMavenBuildStepSelectInput
        dataObject={jfrogStepConfigurationDto}
        setDataObject={setJFrogStepConfigurationDataDto}
        options={listOfSteps}
        disabled={
          (jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("jfrogToolConfigId")?.length === 0) ||
          (listOfSteps && listOfSteps.length === 0)
        }
      />
    </PipelineStepEditorPanelContainer>
  );
}

JFrogMavenStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array,
  parentCallback: PropTypes.func,
};

export default JFrogMavenStepConfiguration;
