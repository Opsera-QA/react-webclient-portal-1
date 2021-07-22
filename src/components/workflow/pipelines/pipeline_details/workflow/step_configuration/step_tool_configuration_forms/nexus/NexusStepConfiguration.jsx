import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import nexusStepFormMetadata from "./nexus-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import _ from "lodash";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import NexusRepoSelectInput from "./inputs/NexusRepoSelectInput";
import NexusRepoFormatSelectInput from "./inputs/NexusRepoFormatSelectInput";
import NexusJenkinsToolInput from "./inputs/NexusJenkinsToolInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import NexusToolSelectInput from "./inputs/NexusToolSelectInput";
import NexusArtifactStepSelectInput from "./inputs/NexusArtifactStepSelectInput";
import NexusStepTypeSelectInput from "./inputs/NexusStepTypeSelectInput";
import NexusCustomVersionToggleInput from "./inputs/NexusCustomVersionToggleInput";

function NexusStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback, createJob, getToolsList }) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [nexusStepConfigurationDto, setNexusStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);

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

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setNexusStepConfigurationDataDto(new Model(configuration, nexusStepFormMetadata, false));
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setNexusStepConfigurationDataDto(
        new Model({ ...nexusStepFormMetadata.newModelBase }, nexusStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    if(nexusStepConfigurationDto.getData("repositoryFormat") !== "" && 
    nexusStepConfigurationDto.getData("repositoryFormat") === "docker") {
      await handleCreateAndSave();
    } else {
      await callbackFunction();
    }
  };

  const handleCreateAndSave = async () => {
    // console.log("saving and creating job for toolID: ", toolId);    
      // setLoading(true);
    let newDataObject = nexusStepConfigurationDto;
    const packageId = nexusStepConfigurationDto.getData("groupName") + ":" + nexusStepConfigurationDto.getData("artifactName");
    newDataObject.setData("packageId", packageId);
    setNexusStepConfigurationDataDto({...newDataObject});

    const toolId = nexusStepConfigurationDto.getData("toolConfigId");
    const createJobPostBody = {
      jobId: "",
      pipelineId: pipelineId,
      stepId: stepId
    };
    console.log("createJobPostBody: ", createJobPostBody);

    const toolConfiguration = {
      configuration: nexusStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
      job_type: "NEXUS_DOCKER_PUSH",
    };
    console.log("item: ", toolConfiguration);

    await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
  };

  const callbackFunction = async () => {
    let newDataObject = nexusStepConfigurationDto;
    const packageId = nexusStepConfigurationDto.getData("groupName") + ":" + nexusStepConfigurationDto.getData("artifactName");
    newDataObject.setData("packageId", packageId);
    setNexusStepConfigurationDataDto({...newDataObject});
    const item = {
      configuration: nexusStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  const getAdditionalFields = () => {    
    if(nexusStepConfigurationDto.getData("repositoryFormat") !== "" && 
    nexusStepConfigurationDto.getData("repositoryFormat") === "docker") {
      return (
        <>          
          <NexusJenkinsToolInput 
            setDataObject={setNexusStepConfigurationDataDto}
            dataObject={nexusStepConfigurationDto}
          />
          <TextInputBase
            setDataObject={setNexusStepConfigurationDataDto}
            dataObject={nexusStepConfigurationDto}
            fieldName={"dockerPort"}
            key="dockerPort"
          />
        </>
      );
    }
    return (
      <>
        <TextInputBase                      
          setDataObject={setNexusStepConfigurationDataDto}
          dataObject={nexusStepConfigurationDto}
          fieldName={"groupName"}
          key="groupName"
        />
        <TextInputBase                      
          setDataObject={setNexusStepConfigurationDataDto}
          dataObject={nexusStepConfigurationDto}
          fieldName={"artifactName"}
          key="artifactName"
        />
      </>
    );
  };

  if (isLoading || nexusStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={nexusStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <NexusToolSelectInput        
        setDataObject={setNexusStepConfigurationDataDto}            
        dataObject={nexusStepConfigurationDto}
        getToolsList={getToolsList}
      />      
      <NexusStepTypeSelectInput         
        setDataObject={setNexusStepConfigurationDataDto}            
        dataObject={nexusStepConfigurationDto}
      />
      <NexusRepoFormatSelectInput         
        setDataObject={setNexusStepConfigurationDataDto}            
        dataObject={nexusStepConfigurationDto}
      />
      <NexusRepoSelectInput
        nexusToolConfigId={nexusStepConfigurationDto.getData("nexusToolConfigId")}
        setDataObject={setNexusStepConfigurationDataDto}        
        dataObject={nexusStepConfigurationDto}
      />
      {getAdditionalFields()}      
      {nexusStepConfigurationDto.getData("type") === "push" &&
        <NexusArtifactStepSelectInput
          setDataObject={setNexusStepConfigurationDataDto}
          dataObject={nexusStepConfigurationDto}
          listOfSteps={listOfSteps}
        />
      }
      {/* flag for custom version */}
      <NexusCustomVersionToggleInput 
        setDataObject={setNexusStepConfigurationDataDto}
        dataObject={nexusStepConfigurationDto}
        fieldName={"customVersion"}
      />      
    </PipelineStepEditorPanelContainer>
  );
}

NexusStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
  createJob: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default NexusStepConfiguration;
