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
import AgentLabelsMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsMultiSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import BranchToBranchGitReviewerInput from "./inputs/BranchToBranchGitReviewerInput";
import BranchToBranchSourceBranchInput from "./inputs/BranchToBranchSourceBranchInput";
import BranchToBranchDestinationBranchInput from "./inputs/BranchToBranchDestinationBranchInput";
import BranchToBranchScmTypeSelectInput from "components/tasks/git_task_details/configuration_forms/branch-to-branch/inputs/BranchToBranchScmTypeSelectInput";
import TaskSalesforceScmToolSelectInput from "components/tasks/git_task_details/configuration_forms/branch-to-branch/inputs/TaskSalesforceScmToolSelectInput";

function BranchToBranchGitTaskConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), branchToBranchGitTaskConfigurationMetadata);
    setGitTasksConfigurationData({...configurationData});
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getAgentLabelsInput = () => {
    if(gitTasksConfigurationData.getData("autoScaleEnable") === true){
      return (
        <Col lg={12}>
          <AgentLabelsMultiSelectInput
            dataObject={gitTasksConfigurationData}
            setDataObject={setGitTasksConfigurationData}
            fieldName={"agentLabels"}
          />
        </Col>
      );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <BranchToBranchScmTypeSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} gitTasksDataDto={gitTasksDataDto}  />
      </Col>     
      <Col lg={12}>
        <TaskSalesforceScmToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          toolIdentifier={gitTasksConfigurationData?.getData("service")}
        />
      </Col>        
      <Col lg={12}>
        <SFDCBitbucketWorkspaceInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SFDCGitRepositoryInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <BranchToBranchSourceBranchInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <BranchToBranchDestinationBranchInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <BooleanToggleInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"deleteSourceBranch"} />
      </Col>      
      {getAgentLabelsInput()}
      <Col lg={12}>
        {gitTasksConfigurationData.getData("gitToolId") && <BooleanToggleInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"autoApprove"} />}
      </Col>
      <Col lg={12}>
        {gitTasksConfigurationData.getData("gitToolId") && gitTasksConfigurationData.getData("autoApprove") && <BranchToBranchGitReviewerInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />}
      </Col>
    </Row>
  );
}

BranchToBranchGitTaskConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default BranchToBranchGitTaskConfigurationPanel;


