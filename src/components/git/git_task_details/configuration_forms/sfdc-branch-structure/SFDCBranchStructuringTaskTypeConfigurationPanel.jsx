import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcGitTaskConfigurationMetadata
  from "components/git/git_task_details/configuration_forms/sfdc/sfdc-git-task-configuration-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SFDCJenkinsToolInput from "../sfdc/inputs/SFDCJenkinsToolInput";
import SFDCJenkinsAccountInput from "../sfdc/inputs/SFDCJenkinsAccountInput";
import SFDCBitbucketWorkspaceInput from "../sfdc/inputs/SFDCBitbucketWorkspaceInput";
import SFDCGitRepositoryInput from "../sfdc/inputs/SFDCGitRepositoryInput";
import SFDCGitBranchInput from "../sfdc/inputs/SFDCGitBranchInput";
import SFDCToolInput from "../sfdc/inputs/SFDCToolInput";
import AgentLabelsMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsMultiSelectInput";

function SFDCBranchStructuringTaskTypeConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), sfdcGitTaskConfigurationMetadata);
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
        <SFDCToolInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
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


