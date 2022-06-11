import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import gitOperationStepFormMetadata from "./gitOperation-stepForm-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import SourceRepositoryTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryTypeSelectInput";
import SourceRepositoryToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryToolSelectInput";
import SourceRepositoryBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositoryBitbucketWorkspaceSelectInput";
import SourceRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/flyway_database/inputs/SourceRepositorySelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import GitOperationActionSelectInput from "./inputs/GitOperationActionSelectInput";
import GitOperationDestinationBranchSelectInput from "./inputs/GitOperationDestinationBranchSelectInput";
import GitOperationSourceBranchSelectInput from "./inputs/GitOperationSourceBranchSelectInput";

function GitOperationStepConfiguration({
  pipelineId,
  stepTool,
  plan,
  stepId,
  closeEditorPanel,
  parentCallback,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [gitOperationModel, setGitOperationModel] = useState(undefined);

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
      setGitOperationModel(
        new Model(configuration, gitOperationStepFormMetadata, false),
      );
    } else {
      setGitOperationModel(
        new Model(
          { ...gitOperationStepFormMetadata.newObjectFields },
          gitOperationStepFormMetadata,
          false,
        ),
      );
    }
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
  };
  const callbackFunction = async () => {
    let newDataObject = gitOperationModel;
    setGitOperationModel({ ...newDataObject });
    const item = {
      configuration: gitOperationModel.getPersistData(),
    };
    parentCallback(item);
  };

  const getSourceSelection = () => {
    return (
      <div>
        <SourceRepositoryTypeSelectInput
          model={gitOperationModel}
          setModel={setGitOperationModel}
          disabled={false}
        />
        <SourceRepositoryToolSelectInput
          model={gitOperationModel}
          setModel={setGitOperationModel}
          sourceRepositoryToolIdentifier={gitOperationModel?.getData("service")}
        />
        <SourceRepositoryBitbucketWorkspaceSelectInput
          model={gitOperationModel}
          setModel={setGitOperationModel}
          accountId={gitOperationModel?.getData("gitToolId")}
          visible={gitOperationModel?.getData("service") === "bitbucket"}
        />
        <SourceRepositorySelectInput
          model={gitOperationModel}
          setModel={setGitOperationModel}
          service={gitOperationModel?.getData("service")}
          accountId={gitOperationModel?.getData("gitToolId")}
          workspace={gitOperationModel?.getData("workspace")}
          visible={
            gitOperationModel?.getData("service") != null &&
            gitOperationModel?.getData("gitToolId") != null &&
            (gitOperationModel?.getData("service" === "bitbucket")
              ? gitOperationModel?.getData("workspace") != null &&
                gitOperationModel?.getData("workspace").length > 0
              : true)
          }
        />
        <GitOperationSourceBranchSelectInput
            model={gitOperationModel}
            setModel={setGitOperationModel}
            fieldName={"gitBranch"}
            targetBranch={gitOperationModel?.getData("targetBranch")}
        />
      </div>
    );
  };

  const getDynamicFields = () => {
    switch (gitOperationModel.getData("action")) {
      case "pr-creation":
        return (
          <>
            <GitOperationDestinationBranchSelectInput
                model={gitOperationModel}
                setModel={setGitOperationModel}
                fieldName={"targetBranch"}
                sourceBranch={gitOperationModel?.getData("gitBranch")}
            />
            <TextInputBase
              dataObject={gitOperationModel}
              setDataObject={setGitOperationModel}
              fieldName={"description"}
            />
          </>
        );
      case "tag-creation":
        return (
          <TextInputBase
            dataObject={gitOperationModel}
            setDataObject={setGitOperationModel}
            fieldName={"tag"}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading || gitOperationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={gitOperationModel}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      {getSourceSelection()}
      <GitOperationActionSelectInput
        model={gitOperationModel}
        setModel={setGitOperationModel}
        fieldName={"action"}
      />
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

GitOperationStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default GitOperationStepConfiguration;
