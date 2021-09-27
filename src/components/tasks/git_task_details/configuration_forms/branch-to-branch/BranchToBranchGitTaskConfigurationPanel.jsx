import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import branchToBranchGitTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/branch-to-branch/branch-to-branch-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SFDCBitbucketWorkspaceInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCBitbucketWorkspaceInput";
import SFDCGitRepositoryInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCGitRepositoryInput";
import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import BranchToBranchGitReviewerInput from "./inputs/BranchToBranchGitReviewerInput";
import BranchToBranchSourceBranchInput from "./inputs/BranchToBranchSourceBranchInput";
import BranchToBranchDestinationBranchInput from "./inputs/BranchToBranchDestinationBranchInput";
import BranchToBranchScmTypeSelectInput from "components/tasks/git_task_details/configuration_forms/branch-to-branch/inputs/BranchToBranchScmTypeSelectInput";
import TaskSalesforceScmToolSelectInput from "components/tasks/git_task_details/configuration_forms/branch-to-branch/inputs/TaskSalesforceScmToolSelectInput";

function BranchToBranchGitTaskConfigurationPanel({ taskModel, taskConfigurationModel, setTaskConfigurationModel }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(taskModel.getData("configuration"), branchToBranchGitTaskConfigurationMetadata);
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

  return (
    <Row>
      <Col lg={12}>
        <BranchToBranchScmTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>     
      <Col lg={12}>
        <TaskSalesforceScmToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          toolIdentifier={taskConfigurationModel?.getData("service")}
        />
      </Col>        
      <Col lg={12}>
        <SFDCBitbucketWorkspaceInput dataObject={taskConfigurationModel} setDataObject={setTaskConfigurationModel} />
      </Col>
      <Col lg={12}>
        <SFDCGitRepositoryInput dataObject={taskConfigurationModel} setDataObject={setTaskConfigurationModel} />
      </Col>
      <Col lg={12}>
        <BranchToBranchSourceBranchInput dataObject={taskConfigurationModel} setDataObject={setTaskConfigurationModel} />
      </Col>
      <Col lg={12}>
        <BranchToBranchDestinationBranchInput dataObject={taskConfigurationModel} setDataObject={setTaskConfigurationModel} />
      </Col>
      <Col lg={12}>
        <BooleanToggleInput dataObject={taskConfigurationModel} setDataObject={setTaskConfigurationModel} fieldName={"deleteSourceBranch"} />
      </Col>      
      {getAgentLabelsInput()}
      <Col lg={12}>
        {taskConfigurationModel.getData("gitToolId") && <BooleanToggleInput dataObject={taskConfigurationModel} setDataObject={setTaskConfigurationModel} fieldName={"autoApprove"} />}
      </Col>
      <Col lg={12}>
        {taskConfigurationModel.getData("gitToolId") && taskConfigurationModel.getData("autoApprove") && <BranchToBranchGitReviewerInput dataObject={taskConfigurationModel} setDataObject={setTaskConfigurationModel} />}
      </Col>
    </Row>
  );
}

BranchToBranchGitTaskConfigurationPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default BranchToBranchGitTaskConfigurationPanel;


