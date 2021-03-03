import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcGitTaskConfigurationMetadata
  from "components/git/git_task_details/configuration_forms/sfdc/sfdc-git-task-configuration-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SFDCJenkinsToolInput from "./inputs/SFDCJenkinsToolInput";
import SFDCJenkinsAccountInput from "./inputs/SFDCJenkinsAccountInput";
import SFDCBitbucketWorkspaceInput from "./inputs/SFDCBitbucketWorkspaceInput";
import SFDCGitRepositoryInput from "./inputs/SFDCGitRepositoryInput";
import SFDCGitBranchInput from "./inputs/SFDCGitBranchInput";
import SFDCToolInput from "./inputs/SFDCToolInput";

function SFDCGitTaskEditorPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), sfdcGitTaskConfigurationMetadata);
    setGitTasksConfigurationData({...configurationData});
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        {/* jenkins tool selection */}
        <SFDCJenkinsToolInput  dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        {/* SFDC Selection */}
        <SFDCToolInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        {/* account */}
        <SFDCJenkinsAccountInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} gitTasksDataDto={gitTasksDataDto} />
      </Col>
      <Col lg={12}>
        {/* workspace */}
        <SFDCBitbucketWorkspaceInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />       
      </Col>
      <Col lg={12}>
        {/* repo */}
        <SFDCGitRepositoryInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        {/* branch */}
        <SFDCGitBranchInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
    </Row>
  );
}

SFDCGitTaskEditorPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default SFDCGitTaskEditorPanel;


