import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcGitBranchTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SFDCJenkinsToolInput from "../sfdc-org-sync/inputs/SFDCJenkinsToolInput";
import SFDCJenkinsAccountInput from "../sfdc-org-sync/inputs/SFDCJenkinsAccountInput";
import SFDCBitbucketWorkspaceInput from "../sfdc-org-sync/inputs/SFDCBitbucketWorkspaceInput";
import SFDCGitRepositoryInput from "../sfdc-org-sync/inputs/SFDCGitRepositoryInput";
import SFDCGitBranchInput from "../sfdc-org-sync/inputs/SFDCGitBranchInput";
import SFDXToolInput from "./inputs/SFDXToolInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import AgentLabelsMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsMultiSelectInput";
import GitBranchTypeSelectionInput from "../sfdc-org-sync/inputs/GitBranchTypeSelectionInput";

function SFDCBranchStructuringTaskTypeConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), sfdcGitBranchTaskConfigurationMetadata);
    setGitTasksConfigurationData({...configurationData});
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicFields = () => {
    if(gitTasksConfigurationData.getData("autoScaleEnable") === true){
      return (
        <Col lg={12}>
          <AgentLabelsMultiSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"agentLabels"} />
        </Col>
      );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <SFDCJenkinsToolInput  dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SFDXToolInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <GitBranchTypeSelectionInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SFDCJenkinsAccountInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} gitTasksDataDto={gitTasksDataDto} />
      </Col>
      <Col lg={12}>
        <SFDCBitbucketWorkspaceInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SFDCGitRepositoryInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SFDCGitBranchInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <TextInputBase fieldName={"destinationBranch"} dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData}/>
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

SFDCBranchStructuringTaskTypeConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default SFDCBranchStructuringTaskTypeConfigurationPanel;


