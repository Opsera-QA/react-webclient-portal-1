import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import { gitToGitMergeConflictResolutionTaskConfigurationMetadata } from "components/tasks/details/tasks/merge-sync-task/git-to-git/gitToGitMergeConflictResolutionTaskConfiguration.metadata";
import GitToGitMergeConflictResolutionTaskSourceControlTypeSelectInput from "components/tasks/details/tasks/merge-sync-task/git-to-git/inputs/GitToGitMergeConflictResolutionTaskSourceControlTypeSelectInput";
import GitToGitMergeConflictResolutionTaskSourceControlToolSelectInput
  from "components/tasks/details/tasks/merge-sync-task/git-to-git/inputs/GitToGitMergeConflictResolutionTaskSourceControlToolSelectInput";
import GitToGitMergeConflictResolutionTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/merge-sync-task/git-to-git/inputs/GitToGitMergeConflictResolutionTaskBitbucketWorkspaceSelectInput";
import GitToGitMergeConflictResolutionTaskRepositorySelectInput
  from "components/tasks/details/tasks/merge-sync-task/git-to-git/inputs/GitToGitMergeConflictResolutionTaskRepositorySelectInput";
import GitToGitMergeConflictResolutionTaskSourceBranchSelectInput
  from "components/tasks/details/tasks/merge-sync-task/git-to-git/inputs/GitToGitMergeConflictResolutionTaskSourceBranchSelectInput";
import GitToGitMergeConflictResolutionTaskTargetBranchSelectInput
  from "components/tasks/details/tasks/merge-sync-task/git-to-git/inputs/GitToGitMergeConflictResolutionTaskTargetBranchSelectInput";
import GitToGitMergeConflictResolutionTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/merge-sync-task/git-to-git/inputs/GitToGitMergeConflictResolutionTaskUpstreamBranchSelectInput";
import {
  mergeSyncTaskConfigurationMetadata
} from "components/tasks/details/tasks/merge-sync-task/mergeSyncTaskConfiguration.metadata";
import { TASK_TYPES } from "components/tasks/task.types";

function GitToGitMergeConflictResolutionTaskConfigurationEditorPanel({
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
    setTaskConfigurationModel({ ...configurationData });
    const newGitModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("git"),
      gitToGitMergeConflictResolutionTaskConfigurationMetadata,
    );
    newGitModel?.setData("jobType", TASK_TYPES.GIT_TO_GIT_MERGE_SYNC);
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
        <GitToGitMergeConflictResolutionTaskSourceControlTypeSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskSourceControlToolSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          toolIdentifier={gitConfigurationModel?.getData("service")}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskBitbucketWorkspaceSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskRepositorySelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskSourceBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          targetBranch={gitConfigurationModel?.getData("targetBranch")}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskTargetBranchSelectInput
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
        <GitToGitMergeConflictResolutionTaskUpstreamBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
    </Row>
  );
}

GitToGitMergeConflictResolutionTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default GitToGitMergeConflictResolutionTaskConfigurationEditorPanel;
