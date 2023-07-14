import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import { mergeSyncTaskGitConfigurationMetadata } from "components/tasks/details/tasks/merge_sync_task/git_to_git/mergeSyncTaskGitConfiguration.metadata";
import GitToGitMergeSyncTaskSourceControlTypeSelectInput from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskSourceControlTypeSelectInput";
import GitToGitMergeSyncTaskSourceControlToolSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskSourceControlToolSelectInput";
import GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput";
import GitToGitMergeSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskRepositorySelectInput";
import GitToGitMergeSyncTaskSourceBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskSourceBranchSelectInput";
import GitToGitMergeSyncTaskTargetBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskTargetBranchSelectInput";
import GitToGitMergeSyncTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskUpstreamBranchSelectInput";
import {
  mergeSyncTaskConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/mergeSyncTaskConfiguration.metadata";
import { TASK_TYPES } from "components/tasks/task.types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import GitToGitMergeSyncTaskCreateNewTargetBranchToggleInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskCreateNewTargetBranchToggleInput";
import MergeSyncTaskJiraToolSelectInput
  from "components/tasks/details/tasks/merge_sync_task/inputs/MergeSyncTaskJiraToolSelectInput";
import MergeSyncTaskJiraProjectSelectInput
  from "components/tasks/details/tasks/merge_sync_task/inputs/MergeSyncTaskJiraProjectSelectInput";
import MergeSyncTaskJiraIssueMultiSelectInput
  from "components/tasks/details/tasks/merge_sync_task/inputs/MergeSyncTaskJiraIssueMultiSelectInput";
import GitToGitMergeSyncTaskBuildTypeSelectInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskBuildTypeSelectInput";
import GitToGitMergeSyncTaskSalesforceToggleInput
  from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskSalesforceToggleInput";
import GitToGitMergeSyncTaskEnableJiraToggleInput from "components/tasks/details/tasks/merge_sync_task/git_to_git/inputs/GitToGitMergeSyncTaskEnableJiraToggleInput"

function GitToGitMergeSyncTaskConfigurationEditorPanel({
  taskModel,
  taskConfigurationModel,
  setTaskConfigurationModel,
}) {
  const [gitConfigurationModel, setGitConfigurationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.parseObjectIntoModel(
      taskModel?.getData("configuration"),
      mergeSyncTaskConfigurationMetadata,
    );
    configurationData?.setData("jobType", TASK_TYPES.GIT_TO_GIT_MERGE_SYNC);
    setTaskConfigurationModel({ ...configurationData });
    const newGitModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("git"),
      mergeSyncTaskGitConfigurationMetadata,
    );
    newGitModel?.setData("jobType", TASK_TYPES.GIT_TO_GIT_MERGE_SYNC);
    setGitConfigurationModel({ ...newGitModel });
  };

  const setModelFunction = (newModel) => {
    setGitConfigurationModel({ ...newModel });
    taskConfigurationModel?.setData("git", gitConfigurationModel?.getPersistData());
    setTaskConfigurationModel({ ...taskConfigurationModel });
  };

  const getDestinationBranchInputs = () => {
    if (gitConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <GitToGitMergeSyncTaskUpstreamBranchSelectInput
              model={gitConfigurationModel}
              setModel={setModelFunction}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={gitConfigurationModel}
              setDataObject={setModelFunction}
              fieldName={"targetBranch"}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <GitToGitMergeSyncTaskTargetBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          sourceBranch={gitConfigurationModel?.getData("sourceBranch")}
        />
      </Col>
    );
  };

  const getJiraInputs = () => {

    if (gitConfigurationModel?.getData("enableJiraIntegration") !== true) {
      return null;
    }

    return (
      <>
        <Col lg={12}>
          <MergeSyncTaskJiraToolSelectInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        <Col lg={12}>
          <MergeSyncTaskJiraProjectSelectInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
            jiraToolId={gitConfigurationModel?.getData("jiraToolId")}
          />
        </Col>
        <Col lg={12}>
          <MergeSyncTaskJiraIssueMultiSelectInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
            jiraToolId={gitConfigurationModel?.getData("jiraToolId")}
            jiraProjectKey={gitConfigurationModel?.getData("jiraProjectKey")}
          />
        </Col>
      </>
    );
  };

  const getSfdcJiraInputs = () => {
    if (gitConfigurationModel?.getData("isSalesforce") !== true) {
      return null;
    }
    return (
      <>
        <Col lg={12}>
          <GitToGitMergeSyncTaskBuildTypeSelectInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
            fieldName={"buildType"}
          />
        </Col>
        <Col lg={12}>
          <GitToGitMergeSyncTaskEnableJiraToggleInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
          />
        </Col>
        {getJiraInputs()}
      </>
    );
  };

  if (taskModel == null || taskConfigurationModel == null || gitConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <GitToGitMergeSyncTaskSalesforceToggleInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      {getSfdcJiraInputs()}
      <Col lg={12}>
        <GitToGitMergeSyncTaskSourceControlTypeSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeSyncTaskSourceControlToolSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          toolIdentifier={gitConfigurationModel?.getData("service")}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeSyncTaskBitbucketWorkspaceSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeSyncTaskRepositorySelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      {(gitConfigurationModel?.getData("jiraIssueIds") === undefined || gitConfigurationModel?.getData("jiraIssueIds")?.length === 0) &&
        <Col lg={12}>
          <GitToGitMergeSyncTaskSourceBranchSelectInput
            model={gitConfigurationModel}
            setModel={setModelFunction}
            targetBranch={gitConfigurationModel?.getData("targetBranch")}
          />
        </Col>}
      <Col lg={12}>
        <GitToGitMergeSyncTaskCreateNewTargetBranchToggleInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      {getDestinationBranchInputs()}
    </Row>
  );
}

GitToGitMergeSyncTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default GitToGitMergeSyncTaskConfigurationEditorPanel;
