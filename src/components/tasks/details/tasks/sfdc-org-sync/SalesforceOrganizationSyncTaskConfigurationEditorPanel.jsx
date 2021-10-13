import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import salesforceOrganizationSyncTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-org-sync/salesforceOrganizationSyncTaskConfigurationMetadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceOrganizationSyncTaskNewBranchToggleInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskNewBranchToggleInput";
import SalesforceOrganizationSyncTaskUpstreamBranchSelectInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskUpstreamBranchSelectInput";
import SalesforceOrganizationSyncTaskGitBranchTextInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchTextInput";
import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import SalesforceOrganizationSyncSalesforceToolSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncSalesforceToolSelectInput";
import SalesforceOrganizationSyncTaskGitBranchSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchSelectInput";
import SalesforceOrganizationSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskRepositorySelectInput";
import SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput";
import SalesforceOrganizationSyncTaskJenkinsAccountSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsAccountSelectInput";
import SalesforceOrganizationSyncJenkinsToolSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncJenkinsToolSelectInput";
import SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function SalesforceOrganizationSyncTaskConfigurationEditorPanel({ taskModel, taskConfigurationModel, setTaskConfigurationModel }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(taskModel.getData("configuration"), salesforceOrganizationSyncTaskConfigurationMetadata);
    setTaskConfigurationModel({...configurationData});
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicFields = () => {
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

  const getPackageXmlPathInput = () => {
    if (taskConfigurationModel?.getData("includePackageXml") === true) {
      return (
        <Col lg={12}>
          <TextInputBase
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"packageXmlReferencePath"}
          />
        </Col>
      );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <SalesforceOrganizationSyncJenkinsToolSelectInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncSalesforceToolSelectInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskJenkinsAccountSelectInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
          gitTasksDataDto={taskModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskRepositorySelectInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskGitBranchSelectInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
          visible={!(taskConfigurationModel?.getData("isNewBranch"))}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskNewBranchToggleInput
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
        />
      </Col>
      {taskConfigurationModel?.getData("isNewBranch") &&
        <>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskGitBranchTextInput
              fieldName={"gitBranch"}
              dataObject={taskConfigurationModel}
              setDataObject={setTaskConfigurationModel}
              visible={taskConfigurationModel?.getData("isNewBranch")}
            />
          </Col>
          <Col lg={12}>
            <SalesforceOrganizationSyncTaskUpstreamBranchSelectInput
              dataObject={taskConfigurationModel}
              setDataObject={setTaskConfigurationModel}
            />
          </Col>
        </>
      }
      {getDynamicFields()}
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      {getPackageXmlPathInput()}
    </Row>
  );
}

SalesforceOrganizationSyncTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceOrganizationSyncTaskConfigurationEditorPanel;


