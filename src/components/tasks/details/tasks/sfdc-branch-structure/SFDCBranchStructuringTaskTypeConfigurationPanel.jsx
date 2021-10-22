import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcGitBranchTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SFDCJenkinsToolInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsToolSelectInput";
import SFDCJenkinsAccountInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsAccountSelectInput";
import SFDCGitRepositoryInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskRepositorySelectInput";
import SFDCGitBranchInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchSelectInput";
import SalesforceBranchStructuringTaskSalesforceConfiguratorToolSelectInput from "components/tasks/details/tasks/sfdc-branch-structure/inputs/SalesforceBranchStructuringTaskSalesforceConfiguratorToolSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import SalesforceOrganizationSyncTaskBranchTypeSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBranchTypeSelectInput";
import SfdcBitbucketWorkspaceInput
  from "components/tasks/details/tasks/sfdc-branch-structure/inputs/SFDCBitbucketWorkspaceInput";

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
        <SalesforceBranchStructuringTaskSalesforceConfiguratorToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskBranchTypeSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SFDCJenkinsAccountInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} gitTasksDataDto={gitTasksDataDto} />
      </Col>
      <Col lg={12}>
        <SfdcBitbucketWorkspaceInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
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


