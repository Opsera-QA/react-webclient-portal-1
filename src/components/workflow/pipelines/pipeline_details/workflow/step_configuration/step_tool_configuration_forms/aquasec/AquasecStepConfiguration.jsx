import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AquasecStepFormMetadata from "./aquasec-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleRestrictedAquasecToolSelectInput from "components/common/list_of_values_input/tools/aquasec/RoleRestrictedAquasecToolSelectInput";
import AquasecDockerBuildStepSelectInput from "./inputs/AquasecDockerBuildStepSelectInput";
import RoleRestrictedJFrogArtifactoryDockerToolSelectInput 
  from "components/common/list_of_values_input/tools/jfrog/RoleRestrictedJFrogArtifactoryDockerToolSelectInput";

function AquasecStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [aquasecStepConfigurationDataModel, setAquasecStepConfigurationDataModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await loadFormData(stepTool);    
    setIsLoading(false);
  };

  const loadFormData = async (step) => {
    let { configuration } = step;

    if (typeof configuration !== "undefined") {
      setAquasecStepConfigurationDataModel(new Model(configuration, AquasecStepFormMetadata, false));
    } else {
      setAquasecStepConfigurationDataModel(
        new Model({ ...AquasecStepFormMetadata.newObjectFields }, AquasecStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = aquasecStepConfigurationDataModel;
    setAquasecStepConfigurationDataModel({ ...newDataObject });
    const item = {
      configuration: aquasecStepConfigurationDataModel.getPersistData(),
    };
    await parentCallback(item);
  };

  if (isLoading || aquasecStepConfigurationDataModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={aquasecStepConfigurationDataModel}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <RoleRestrictedAquasecToolSelectInput
        model={aquasecStepConfigurationDataModel}
        setModel={setAquasecStepConfigurationDataModel}
        fieldName={"aquasecToolConfigId"}
      />
      <AquasecDockerBuildStepSelectInput
        fieldName={"buildStepId"}
        plan={plan}
        stepId={stepId}
        model={aquasecStepConfigurationDataModel}
        setModel={setAquasecStepConfigurationDataModel}
      />
      <RoleRestrictedJFrogArtifactoryDockerToolSelectInput
        fieldName={"dockerRegistryToolConfigId"}
        model={aquasecStepConfigurationDataModel}
        setModel={setAquasecStepConfigurationDataModel}        
      />
      <TextInputBase
        dataObject={aquasecStepConfigurationDataModel}
        setDataObject={setAquasecStepConfigurationDataModel}
        fieldName={"dockerImage"}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AquasecStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default AquasecStepConfiguration;
