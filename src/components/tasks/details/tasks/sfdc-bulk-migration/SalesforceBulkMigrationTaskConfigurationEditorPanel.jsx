import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceOrganizationSyncTaskNewBranchToggleInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskNewBranchToggleInput";
import SalesforceOrganizationSyncTaskUpstreamBranchSelectInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskUpstreamBranchSelectInput";
import SalesforceOrganizationSyncTaskGitBranchTextInput from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskGitBranchTextInput";
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
import salesforceBulkMigrationTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-bulk-migration/salesforceBulkMigrationTaskConfigurationMetadata";

function SalesforceBulkMigrationTaskConfigurationEditorPanel(
  {
    taskModel,
    taskConfigurationModel,
    setTaskConfigurationModel
  }) {

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const configurationData = modelHelpers.getToolConfigurationModel(taskModel.getData("configuration"), salesforceBulkMigrationTaskConfigurationMetadata);
    setTaskConfigurationModel({...configurationData});
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <SalesforceOrganizationSyncJenkinsToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncSalesforceToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskJenkinsAccountSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          taskModel={taskModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskBitbucketWorkspaceSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskRepositorySelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceOrganizationSyncTaskGitBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          visible={taskConfigurationModel?.getData("isNewBranch") !== true}
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
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
              visible={taskConfigurationModel?.getData("isNewBranch") === true}
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
    </Row>
  );
}

SalesforceBulkMigrationTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceBulkMigrationTaskConfigurationEditorPanel;


