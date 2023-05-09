import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OracleFusionReportMigrationStepFormMetadata from "./oracleFusion-reportMigration-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import OracleFusionReportMigrationStepMigrationTypeSelectInput from "./inputs/OracleFusionReportMigrationStepMigrationTypeSelectInput";
import OracleFusionReportMigrationSourceToolSelectInput from "./inputs/OracleFusionReportMigrationSourceToolSelectInput";
import OracleFusionReportMigrationTargetToolSelectInput from "./inputs/OracleFusionReportMigrationTargetToolSelectInput";
import OracleFusionReportMigrationSourceReportsMultiSelectInput from "./inputs/OracleFusionReportMigrationSourceReportsMultiSelectInput";
import OracleFusionReportMigrationScmToolTypeSelectInput from "./inputs/OracleFusionReportMigrationScmToolTypeSelectInput";
import OracleFusionReportMigrationScmToolSelectInput from "./inputs/OracleFusionReportMigrationScmToolSelectInput";
import OracleFusionReportMigrationGitRepositoryInput from "./inputs/OracleFusionReportMigrationGitRepositoryInput";
import OracleFusionReportMigrationGitBranchInput from "./inputs/OracleFusionReportMigrationGitBranchInput";
import OracleFusionReportMigrationNexusToolSelectInput from "./inputs/OracleFusionReportMigrationNexusToolSelectInput";
import OracleFusionReportMigrationNexusRepoSelectInput from "./inputs/OracleFusionReportMigrationNexusRepoSelectInput";
import OracleFusionReportMigrationNexusRepoGroupSelectInput from "./inputs/OracleFusionReportMigrationNexusRepoGroupSelectInput";
import OracleFusionReportMigrationArtifactoryStepSelectInput from "./inputs/OracleFusionReportMigrationArtifactoryStepSelectInput";
import OracleFusionReportMigrationStepArtifactoryTypeSelectInput from "./inputs/OracleFusionReportMigrationStepArtifactoryTypeSelectInput";
import OracleFusionReportMigrationReportsInput from "./inputs/OracleFusionReportMigrationReportsInput";

function OracleFusionReportMigrationStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [oracleFusionReportMigrationStepConfigurationModel, setOracleFusionReportMigrationStepConfigurationModel] = useState(undefined);

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
      setOracleFusionReportMigrationStepConfigurationModel(new Model(configuration, OracleFusionReportMigrationStepFormMetadata, false));
    } else {
      setOracleFusionReportMigrationStepConfigurationModel(
        new Model({ ...OracleFusionReportMigrationStepFormMetadata.newObjectFields }, OracleFusionReportMigrationStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = oracleFusionReportMigrationStepConfigurationModel;
    setOracleFusionReportMigrationStepConfigurationModel({ ...newDataObject });
    const item = {
      configuration: oracleFusionReportMigrationStepConfigurationModel.getPersistData(),
    };
    await parentCallback(item);
  };

  const getPullReportsFields = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("migrationType") !== "pull_reports"){
      return null;
    }
    return (
      <>
        <OracleFusionReportMigrationSourceToolSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <OracleFusionReportMigrationScmToolTypeSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <OracleFusionReportMigrationScmToolSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <OracleFusionReportMigrationGitRepositoryInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <OracleFusionReportMigrationGitBranchInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <TextInputBase 
          dataObject={oracleFusionReportMigrationStepConfigurationModel}
          setDataObject={setOracleFusionReportMigrationStepConfigurationModel}
          fieldName={"gitCommitId"}
        />
      </>
    );
  };

  const getNexusPushReportsFields = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("artifactoryType") !== "nexus"){
      return null;
    }
    return (
      <>
        <OracleFusionReportMigrationNexusToolSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <OracleFusionReportMigrationNexusRepoSelectInput
          nexusToolConfigId={oracleFusionReportMigrationStepConfigurationModel.getData("nexusToolConfigId")}
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel} 
        />
        <OracleFusionReportMigrationNexusRepoGroupSelectInput           
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
          nexusToolConfigId={oracleFusionReportMigrationStepConfigurationModel.getData("nexusToolConfigId")}
          repositoryName={oracleFusionReportMigrationStepConfigurationModel.getData("repositoryName")}
        />        
      </>
    );  
  };

  const getPushReportsFields = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("migrationType") !== "push_reports"){
      return null;
    }
    return (
      <>
        <OracleFusionReportMigrationStepArtifactoryTypeSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        {getNexusPushReportsFields()}
        <OracleFusionReportMigrationArtifactoryStepSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
          plan={plan}
          stepId={stepId}
        />
      </>
    );    
  };

  const getSourceInstanceFields = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("migrationType") !== "instance_to_instance"){
      return null;
    }
    return (
      <>
        <OracleFusionReportMigrationSourceToolSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <TextInputBase 
          dataObject={oracleFusionReportMigrationStepConfigurationModel}
          setDataObject={setOracleFusionReportMigrationStepConfigurationModel}
          fieldName={"sourceInstancePath"}
        />
        <OracleFusionReportMigrationSourceReportsMultiSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
          sourceToolId={oracleFusionReportMigrationStepConfigurationModel?.getData("sourceInstanceToolId")}
          sourceFolder={oracleFusionReportMigrationStepConfigurationModel?.getData("sourceInstancePath")}
        />
        <OracleFusionReportMigrationTargetToolSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <TextInputBase 
          dataObject={oracleFusionReportMigrationStepConfigurationModel}
          setDataObject={setOracleFusionReportMigrationStepConfigurationModel}
          fieldName={"targetInstancePath"}
        />
      </>
    );
  };

  const getNexusSteps = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("artifactoryType") !== "nexus"){
      return null;
    }
    return (
      <>
        <OracleFusionReportMigrationNexusToolSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <OracleFusionReportMigrationNexusRepoSelectInput
          nexusToolConfigId={oracleFusionReportMigrationStepConfigurationModel.getData("nexusToolConfigId")}
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel} 
        />
        <OracleFusionReportMigrationNexusRepoGroupSelectInput           
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
          nexusToolConfigId={oracleFusionReportMigrationStepConfigurationModel.getData("nexusToolConfigId")}
          repositoryName={oracleFusionReportMigrationStepConfigurationModel.getData("repositoryName")}
        />
        <OracleFusionReportMigrationReportsInput
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
          fieldName={"reportArtifactList"}
          type={"Report List"}
        />
      </>
    );
  };

  const getArtifactoryInstanceFields = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("migrationType") !== "artifactory_to_instance"){
      return null;
    }
    return (
      <>
        <OracleFusionReportMigrationStepArtifactoryTypeSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        {getNexusSteps()}
        <OracleFusionReportMigrationTargetToolSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
        />
        <TextInputBase 
          dataObject={oracleFusionReportMigrationStepConfigurationModel}
          setDataObject={setOracleFusionReportMigrationStepConfigurationModel}
          fieldName={"targetInstancePath"}
        />
      </>
    );
  };

  if (isLoading || oracleFusionReportMigrationStepConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={oracleFusionReportMigrationStepConfigurationModel}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <OracleFusionReportMigrationStepMigrationTypeSelectInput 
        model={oracleFusionReportMigrationStepConfigurationModel}
        setModel={setOracleFusionReportMigrationStepConfigurationModel}
      />
      {getArtifactoryInstanceFields()}
      {getSourceInstanceFields()}
      {getPullReportsFields()}
      {getPushReportsFields()}
    </PipelineStepEditorPanelContainer>
  );
}

OracleFusionReportMigrationStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default OracleFusionReportMigrationStepConfiguration;
