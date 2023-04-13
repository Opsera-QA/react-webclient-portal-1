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
import OracleFusionReportMigrationArtifactoryStepSelectInput from "./inputs/OracleFusionReportMigrationArtifactoryStepSelectInput";
import OracleFusionReportMigrationSourceReportsMultiSelectInput from "./inputs/OracleFusionReportMigrationSourceReportsMultiSelectInput";

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

  const getSourceInstanceFields = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("migrationType") === "instance_to_instance"){
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
        </>
      );
    }
  };

  const getArtifactoryFields = () => {
    if (oracleFusionReportMigrationStepConfigurationModel?.getData("migrationType") === "artifactory_to_instance"){
      return (
        <OracleFusionReportMigrationArtifactoryStepSelectInput 
          model={oracleFusionReportMigrationStepConfigurationModel}
          setModel={setOracleFusionReportMigrationStepConfigurationModel}
          plan={plan}
          stepId={stepId}
        />
      );
    }
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
      {getSourceInstanceFields()}      
      <OracleFusionReportMigrationTargetToolSelectInput 
        model={oracleFusionReportMigrationStepConfigurationModel}
        setModel={setOracleFusionReportMigrationStepConfigurationModel}
      />
      <TextInputBase 
        dataObject={oracleFusionReportMigrationStepConfigurationModel}
        setDataObject={setOracleFusionReportMigrationStepConfigurationModel}
        fieldName={"targetInstancePath"}
      />
      {getArtifactoryFields()}
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
