import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import { gitToGitMergeSyncTaskConfigurationMetadata } from "components/tasks/details/tasks/merge_sync_task/git_to_git/gitToGitMergeSyncTaskConfiguration.metadata";
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
    const configurationData = modelHelpers.getToolConfigurationModel(
      taskModel?.getData("configuration"),
      mergeSyncTaskConfigurationMetadata,
    );
    configurationData?.setData("jobType", TASK_TYPES.GIT_TO_GIT_MERGE_SYNC);
    setTaskConfigurationModel({ ...configurationData });
    const newGitModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("git"),
      gitToGitMergeSyncTaskConfigurationMetadata,
    );
    setGitConfigurationModel({...newGitModel});
  };

  const setModelFunction = (newModel) => {
    setGitConfigurationModel({...newModel});
    taskConfigurationModel?.setData("git", gitConfigurationModel?.getPersistData());
    setTaskConfigurationModel({...taskConfigurationModel});
  };

  if (taskModel == null || taskConfigurationModel == null || gitConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
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
      <Col lg={12}>
        <GitToGitMergeSyncTaskSourceBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          targetBranch={gitConfigurationModel?.getData("targetBranch")}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeSyncTaskTargetBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          sourceBranch={gitConfigurationModel?.getData("sourceBranch")}
        />
      </Col>
      <Col lg={12}>
        <BooleanToggleInput
          dataObject={gitConfigurationModel}
          setDataObject={setModelFunction}
          fieldName={"isNewBranch"}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeSyncTaskUpstreamBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
    </Row>
  );
}

GitToGitMergeSyncTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default GitToGitMergeSyncTaskConfigurationEditorPanel;
