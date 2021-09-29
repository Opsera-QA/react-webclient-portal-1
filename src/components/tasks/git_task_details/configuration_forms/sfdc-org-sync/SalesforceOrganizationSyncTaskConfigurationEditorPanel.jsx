import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceOrganizationSyncTaskNewBranchToggleInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskNewBranchToggleInput";
import SalesforceOrganizationSyncTaskUpstreamBranchSelectInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskUpstreamBranchSelectInput";
import SalesforceOrganizationSyncTaskGitBranchTextInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchTextInput";
import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import SalesforceOrganizationSyncSalesforceToolSelectInput
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncSalesforceToolSelectInput";
import SalesforceOrganizationSyncTaskGitBranchSelectInput
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchSelectInput";
import SalesforceOrganizationSyncTaskRepositorySelectInput
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskRepositorySelectInput";
import SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput";
import SalesforceOrganizationSyncTaskJenkinsAccountSelectInput
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsAccountSelectInput";
import SalesforceOrganizationSyncJenkinsToolSelectInput
  from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SalesforceOrganizationSyncJenkinsToolSelectInput";

function SalesforceOrganizationSyncTaskConfigurationEditorPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
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

  // const getPackageXmlPathInput = () => {
  //   if (taskConfigurationModel?.getData("includePackageXml") === true) {
  //     return (
  //       <Col lg={12}>
  //         <TextInputBase
  //           dataObject={taskConfigurationModel}
  //           setDataObject={setTaskConfigurationModel}
  //           fieldName={"packageXmlReferencePath"}
  //         />
  //       </Col>
  //     );
  //   }
  // };

  return (
    <Row>
      <Col lg={12}>
        <SalesforceOrganizationSyncJenkinsToolSelectInput  dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncSalesforceToolSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskJenkinsAccountSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} gitTasksDataDto={gitTasksDataDto} />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskRepositorySelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskGitBranchSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} visible={!(gitTasksConfigurationData?.getData("isNewBranch"))}/>
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskNewBranchToggleInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
      </Col>
      {gitTasksConfigurationData?.getData("isNewBranch") && 
        <>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskGitBranchTextInput
              fieldName={"gitBranch"}
              dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} visible={gitTasksConfigurationData?.getData("isNewBranch")}
            />
          </Col>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskUpstreamBranchSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} />
          </Col>
        </>
      }
      {getDynamicFields()}
      {/*<Col lg={12}>*/}
      {/*  <SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput*/}
      {/*    model={taskConfigurationModel}*/}
      {/*    setModel={setTaskConfigurationModel}*/}
      {/*  />*/}
      {/*</Col>*/}
      {/*{getPackageXmlPathInput()}*/}
    </Row>
  );
}

SalesforceOrganizationSyncTaskConfigurationEditorPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default SalesforceOrganizationSyncTaskConfigurationEditorPanel;


