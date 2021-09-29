import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SFDCJenkinsToolInput from "./inputs/SFDCJenkinsToolInput";
import SFDCJenkinsAccountInput from "./inputs/SFDCJenkinsAccountInput";
import SFDCBitbucketWorkspaceInput from "./inputs/SFDCBitbucketWorkspaceInput";
import SFDCGitRepositoryInput from "./inputs/SFDCGitRepositoryInput";
import SFDCGitBranchInput from "./inputs/SFDCGitBranchInput";
import SFDCToolInput from "./inputs/SFDCToolInput";
import SFDCNewBranchBoolInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCNewBranchBoolInput";
import SfdcGitUpstreamBranchInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SfdcGitUpstreamBranchInput";
import SFDCGitBranchTextInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCGitBranchTextInput";

import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";

function SalesforceOrganizationSyncConfigurationEditorPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), salesforceOrganizationSyncTaskConfigurationMetadata);
    setGitTasksConfigurationData({...configurationData});
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicFields = () => {
    if(gitTasksConfigurationData.getData("autoScaleEnable") === true){
      return (
        <Col lg={12}>
          <AgentLabelsSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"agentLabels"} />
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
        <SFDCGitBranchInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} visible={!(gitTasksConfigurationData?.getData("isNewBranch"))}/>
      </Col>
      <Col lg={12}>
        <SFDCNewBranchBoolInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      {gitTasksConfigurationData?.getData("isNewBranch") && 
        <>
          <Col lg={12}>
            <SFDCGitBranchTextInput
              fieldName={"gitBranch"}
              dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} visible={gitTasksConfigurationData?.getData("isNewBranch")}
            />
          </Col>
          <Col lg={12}>
            <SfdcGitUpstreamBranchInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
          </Col>
        </>
      }
      {getDynamicFields()}
    </Row>
  );
}

SalesforceOrganizationSyncConfigurationEditorPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default SalesforceOrganizationSyncConfigurationEditorPanel;


