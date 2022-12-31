import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LiquibaseStepFormMetadata from "./liquibase-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LiquibaseToolSelectInput from "./inputs/LiquibaseToolSelectInput";
import LiquibaseStepTypeSelectInput from "./inputs/LiquibaseStepTypeSelectInput";
import LiquibaseScmToolTypeSelectInput from "./inputs/LiquibaseScmToolTypeSelectInput";
import LiquibaseScmToolSelectInput from "./inputs/LiquibaseScmToolSelectInput";
import LiquibaseBitbucketWorkspaceInput from "./inputs/LiquibaseBitbucketWorkspaceInput";
import LiquibaseGitRepositoryInput from "./inputs/LiquibaseGitRepositoryInput";
import LiquibaseGitBranchInput from "./inputs/LiquibaseGitBranchInput";
import LiquibaseTagSelectInput from "./inputs/LiquibaseTagSelectInput";

function LiquibaseStepConfiguration({ pipelineId, stepTool, plan, stepId, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [liquibaseStepConfigurationDto, setLiquibaseConfigurationDataDto] = useState(undefined);

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
      setLiquibaseConfigurationDataDto(new Model(configuration, LiquibaseStepFormMetadata, false));
    } else {
      setLiquibaseConfigurationDataDto(
        new Model({ ...LiquibaseStepFormMetadata.newObjectFields }, LiquibaseStepFormMetadata, false)
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = liquibaseStepConfigurationDto;
    setLiquibaseConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: liquibaseStepConfigurationDto.getPersistData(),
    };
    await parentCallback(item);
  };

  if (isLoading || liquibaseStepConfigurationDto == null) {
    return <LoadingDialog size="sm" />;
  }

  const getDynamicFields = () => {
    if (liquibaseStepConfigurationDto?.getData("dbType") === "oracle") {
      return null;
    }
    return (
      <>
        <TextInputBase
          dataObject={liquibaseStepConfigurationDto}
          setDataObject={setLiquibaseConfigurationDataDto}
          fieldName={"database"}
        />
        <TextInputBase
          dataObject={liquibaseStepConfigurationDto}
          setDataObject={setLiquibaseConfigurationDataDto}
          fieldName={"warehouse"}
        />
      </>
    );
  };

  const getScmInputs = () => {
    if (liquibaseStepConfigurationDto?.getData("service") == undefined || liquibaseStepConfigurationDto?.getData("service") === "") {
      return null;
    }
    return (
      <>
        <LiquibaseScmToolSelectInput
          model={liquibaseStepConfigurationDto}
          setModel={setLiquibaseConfigurationDataDto}
        />
        <LiquibaseBitbucketWorkspaceInput
          model={liquibaseStepConfigurationDto}
          setModel={setLiquibaseConfigurationDataDto}
          disabled={hasStringValue(liquibaseStepConfigurationDto?.getData("gitToolId")) !== true}
        />
        <LiquibaseGitRepositoryInput
          model={liquibaseStepConfigurationDto}
          setModel={setLiquibaseConfigurationDataDto}
          disabled={hasStringValue(liquibaseStepConfigurationDto?.getData("gitToolId")) !== true}
        />
        <LiquibaseGitBranchInput
          model={liquibaseStepConfigurationDto}
          setModel={setLiquibaseConfigurationDataDto}
          disabled={hasStringValue(liquibaseStepConfigurationDto?.getData("gitRepository")) !== true}
        />
      </>
    );
  };

  const getTagField = () => {
    if (liquibaseStepConfigurationDto?.getData("jobType") === "rollback") {
      return (
        <LiquibaseTagSelectInput 
          model={liquibaseStepConfigurationDto}
          setModel={setLiquibaseConfigurationDataDto}
          toolConfigId={liquibaseStepConfigurationDto?.getData("toolConfigId")}
          database={liquibaseStepConfigurationDto?.getData("database")}
          schema={liquibaseStepConfigurationDto?.getData("baseSchema")}
        />
      );
    }
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={liquibaseStepConfigurationDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <LiquibaseStepTypeSelectInput
        model={liquibaseStepConfigurationDto}
        setModel={setLiquibaseConfigurationDataDto}
      />
      <LiquibaseToolSelectInput
        model={liquibaseStepConfigurationDto}
        setModel={setLiquibaseConfigurationDataDto}
      />
      {getDynamicFields()}
      <LiquibaseScmToolTypeSelectInput
        model={liquibaseStepConfigurationDto}
        setModel={setLiquibaseConfigurationDataDto}
      />
      {getScmInputs()}
      <TextInputBase
        dataObject={liquibaseStepConfigurationDto}
        setDataObject={setLiquibaseConfigurationDataDto}
        fieldName={"scriptFilePath"}
      />
      <TextInputBase
        dataObject={liquibaseStepConfigurationDto}
        setDataObject={setLiquibaseConfigurationDataDto}
        fieldName={"baseSchema"}
      />
      {getTagField()}
    </PipelineStepEditorPanelContainer>
  );
}

LiquibaseStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default LiquibaseStepConfiguration;
