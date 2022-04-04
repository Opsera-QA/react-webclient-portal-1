import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import branchToBranchGitTaskConfigurationMetadata
  from "components/tasks/details/tasks/branch-to-branch/branch-to-branch-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import GitToGitSyncTaskReviewerMultiSelectInput from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskReviewerMultiSelectInput";
import GitToGitSyncTaskSourceBranchSelectInput from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskSourceBranchSelectInput";
import GitToGitSyncTaskDestinationBranchSelectInput from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskDestinationBranchSelectInput";
import GitToGitSyncTaskScmTypeSelectInput from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskScmTypeSelectInput";
import GitToGitSyncTaskScmToolSelectInput from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskScmToolSelectInput";
import GitToGitSyncTaskAutoApprovalToggleInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskAutoApprovalToggleInput";
import GitToGitSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskRepositorySelectInput";
import GitToGitSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/branch-to-branch/inputs/GitToGitSyncTaskBitbucketWorkspaceSelectInput";

function GitToGitMergeConflictResolutionTaskConfigurationEditorPanel({ taskModel, taskConfigurationModel, setTaskConfigurationModel }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(taskModel?.getData("configuration"), branchToBranchGitTaskConfigurationMetadata);
    setTaskConfigurationModel({...configurationData});
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getAgentLabelsInput = () => {
    if(taskConfigurationModel.getData("autoScaleEnable") === true){
      return (
        <Col lg={12}>
          <AgentLabelsSelectInput
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"agentLabels"}
          />
        </Col>
      );
    }
  };

  const getTaskReviewerInput = () => {
    if (taskConfigurationModel?.getData("autoApprove") === true) {
      return (
        <Col lg={12}>
          <GitToGitSyncTaskReviewerMultiSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
            toolId={taskConfigurationModel?.getData("gitToolId")}
            workspace={taskConfigurationModel?.getData("workspace")}
            repository={taskConfigurationModel?.getData("repository")}
            service={taskConfigurationModel?.getData("service")}
            autoApprove={taskConfigurationModel?.getData("autoApprove")}
          />
        </Col>
      );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <GitToGitSyncTaskScmTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>     
      <Col lg={12}>
        <GitToGitSyncTaskScmToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          toolIdentifier={taskConfigurationModel?.getData("service")}
        />
      </Col>        
      <Col lg={12}>
        <GitToGitSyncTaskBitbucketWorkspaceSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <GitToGitSyncTaskRepositorySelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <GitToGitSyncTaskSourceBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          targetBranch={taskConfigurationModel?.getData("gitBranch")}
        />
      </Col>
      <Col lg={12}>
        <GitToGitSyncTaskDestinationBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          sourceBranch={taskConfigurationModel?.getData("sourceBranch")}
        />
      </Col>
      <Col lg={12}>
        <BooleanToggleInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
          fieldName={"deleteSourceBranch"}
        />
      </Col>      
      {getAgentLabelsInput()}
      <Col lg={12}>
        <GitToGitSyncTaskAutoApprovalToggleInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          disabled={!taskConfigurationModel?.getData("gitToolId") || taskConfigurationModel?.getData("gitToolId")?.length === 0}
        />
      </Col>
      {getTaskReviewerInput()}
    </Row>
  );
}

GitToGitMergeConflictResolutionTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default GitToGitMergeConflictResolutionTaskConfigurationEditorPanel;


