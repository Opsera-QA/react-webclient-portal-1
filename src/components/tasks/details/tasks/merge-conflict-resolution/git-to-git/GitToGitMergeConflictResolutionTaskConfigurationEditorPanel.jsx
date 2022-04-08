import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import { gitToGitMergeConflictResolutionTaskConfigurationMetadata } from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/gitToGitMergeConflictResolutionTaskConfiguration.metadata";
import GitToGitMergeConflictResolutionTaskSourceControlTypeSelectInput from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/inputs/GitToGitMergeConflictResolutionTaskSourceControlTypeSelectInput";
import GitToGitMergeConflictResolutionTaskSourceControlToolSelectInput
  from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/inputs/GitToGitMergeConflictResolutionTaskSourceControlToolSelectInput";
import GitToGitMergeConflictResolutionTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/inputs/GitToGitMergeConflictResolutionTaskBitbucketWorkspaceSelectInput";
import GitToGitMergeConflictResolutionTaskRepositorySelectInput
  from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/inputs/GitToGitMergeConflictResolutionTaskRepositorySelectInput";
import GitToGitMergeConflictResolutionTaskSourceBranchSelectInput
  from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/inputs/GitToGitMergeConflictResolutionTaskSourceBranchSelectInput";
import GitToGitMergeConflictResolutionTaskTargetBranchSelectInput
  from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/inputs/GitToGitMergeConflictResolutionTaskTargetBranchSelectInput";
import GitToGitMergeConflictResolutionTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/merge-conflict-resolution/git-to-git/inputs/GitToGitMergeConflictResolutionTaskUpstreamBranchSelectInput";

function GitToGitMergeConflictResolutionTaskConfigurationEditorPanel({
  taskModel,
  taskConfigurationModel,
  setTaskConfigurationModel,
}) {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      taskModel?.getData("configuration"),
      gitToGitMergeConflictResolutionTaskConfigurationMetadata,
    );
    setTaskConfigurationModel({ ...configurationData });
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskSourceControlTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskSourceControlToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          toolIdentifier={taskConfigurationModel?.getData("service")}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskBitbucketWorkspaceSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskRepositorySelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskSourceBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          targetBranch={taskConfigurationModel?.getData("targetBranch")}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskTargetBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          sourceBranch={taskConfigurationModel?.getData("sourceBranch")}
        />
      </Col>
      <Col lg={12}>
        <BooleanToggleInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
          fieldName={"isNewBranch"}
        />
      </Col>
      <Col lg={12}>
        <GitToGitMergeConflictResolutionTaskUpstreamBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
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
