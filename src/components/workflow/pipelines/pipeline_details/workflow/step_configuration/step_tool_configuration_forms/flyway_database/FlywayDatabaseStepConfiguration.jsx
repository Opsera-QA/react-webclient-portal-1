import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import flywayDatabaseStepFormMetadata from "./flyway-database-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SourceRepositoryTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryTypeSelectInput";
import SourceRepositoryToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryToolSelectInput";
import SourceRepositoryBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryBitbucketWorkspaceSelectInput";
import SourceRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositorySelectInput";
import SourceRepositoryPrimaryBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryPrimaryBranchSelectInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import FlywayStepTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/FlywayStepTypeSelectInput";
import FlywayToolSelectInput from "./inputs/FlywayToolSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
function FlywayDatabaseStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [flywayStepConfigurationDto, setFlywayStepConfigurationDataDto] = useState(undefined);

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
      setFlywayStepConfigurationDataDto(new Model(configuration, flywayDatabaseStepFormMetadata, false));
    } else {
      setFlywayStepConfigurationDataDto(
        new Model({ ...flywayDatabaseStepFormMetadata.newObjectFields }, flywayDatabaseStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
      await callbackFunction();
  };
  const callbackFunction = async () => {
    let newDataObject = flywayStepConfigurationDto;
    setFlywayStepConfigurationDataDto({...newDataObject});
    const item = {
      configuration: flywayStepConfigurationDto.getPersistData(),
    };
    parentCallback(item);
  };


  if (isLoading || flywayStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={flywayStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <FlywayStepTypeSelectInput
        fieldName={"type"}
        model={flywayStepConfigurationDto}
        setModel={setFlywayStepConfigurationDataDto}
      />
      <FlywayToolSelectInput
        fieldName={"toolConfigId"}
        model={flywayStepConfigurationDto}
        setModel={setFlywayStepConfigurationDataDto}
      />
      <SourceRepositoryTypeSelectInput
        model={flywayStepConfigurationDto}
        setModel={setFlywayStepConfigurationDataDto}
      />

      <SourceRepositoryToolSelectInput
        model={flywayStepConfigurationDto}
        setModel={setFlywayStepConfigurationDataDto}
        sourceRepositoryToolIdentifier={flywayStepConfigurationDto?.getData("service")}
      />
      <SourceRepositoryBitbucketWorkspaceSelectInput
        model={flywayStepConfigurationDto}
        setModel={setFlywayStepConfigurationDataDto}
        accountId={flywayStepConfigurationDto?.getData("gitToolId")}
        visible={flywayStepConfigurationDto?.getData("service") === "bitbucket"}
      />
      <SourceRepositorySelectInput
        model={flywayStepConfigurationDto}
        setModel={setFlywayStepConfigurationDataDto}
        service={flywayStepConfigurationDto?.getData("service")}
        accountId={flywayStepConfigurationDto?.getData("gitToolId")}
        workspace={flywayStepConfigurationDto?.getData("workspace")}
        visible={
          flywayStepConfigurationDto?.getData("service") != null
          && flywayStepConfigurationDto?.getData("gitToolId") != null
          && (flywayStepConfigurationDto?.getData("service" === "bitbucket") ? flywayStepConfigurationDto?.getData("workspace") != null && flywayStepConfigurationDto?.getData("workspace").length > 0 : true)}
      />
      <SourceRepositoryPrimaryBranchSelectInput
        model={flywayStepConfigurationDto}
        setModel={setFlywayStepConfigurationDataDto}
      />
      <BooleanToggleInput 
        fieldName={"outOfOrder"}
        dataObject={flywayStepConfigurationDto}
        setDataObject={setFlywayStepConfigurationDataDto}
      />
      <MultiTextInputBase
        fieldName={"schema"}
        setDataObject={setFlywayStepConfigurationDataDto}
        dataObject={flywayStepConfigurationDto}
      />
      <TextInputBase fieldName={"baseSchema"} dataObject={flywayStepConfigurationDto} setDataObject={setFlywayStepConfigurationDataDto}/>
      <TextInputBase fieldName={"scriptFilePath"} dataObject={flywayStepConfigurationDto} setDataObject={setFlywayStepConfigurationDataDto}/>
      {(flywayStepConfigurationDto.getData("dbType") !== "mysql"|| flywayStepConfigurationDto.getData("dbType") !== "oracle") && <TextInputBase fieldName={"database"} dataObject={flywayStepConfigurationDto} setDataObject={setFlywayStepConfigurationDataDto}/>}
      {flywayStepConfigurationDto.getData("dbType") === "snowflake" && <TextInputBase fieldName={"warehouse"} dataObject={flywayStepConfigurationDto} setDataObject={setFlywayStepConfigurationDataDto}/>}
    </PipelineStepEditorPanelContainer>
  );
}

FlywayDatabaseStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default FlywayDatabaseStepConfiguration;
