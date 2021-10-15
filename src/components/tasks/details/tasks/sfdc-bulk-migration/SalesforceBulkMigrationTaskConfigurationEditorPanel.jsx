import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceBulkMigrationTaskJenkinsToolSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskJenkinsToolSelectInput";
import SalesforceBulkMigrationTaskSalesforceToolSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskSalesforceToolSelectInput";
import SalesforceBulkMigrationTaskJenkinsAccountSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskJenkinsAccountSelectInput";
import SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput";
import SalesforceBulkMigrationTaskRepositorySelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskRepositorySelectInput";
import SalesforceBulkMigrationTaskNewBranchToggleInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskNewBranchToggleInput";
import SalesforceBulkMigrationTaskGitBranchTextInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskGitBranchTextInput";
import SalesforceBulkMigrationTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskUpstreamBranchSelectInput";
import SalesforceBulkMigrationTaskGitBranchSelectInput
  from "components/tasks/details/tasks/sfdc-bulk-migration/inputs/SalesforceBulkMigrationTaskGitBranchSelectInput";
import {salesforceBulkMigrationTaskConfigurationMetadata} from "components/tasks/details/tasks/sfdc-bulk-migration/salesforceBulkMigrationTaskConfigurationMetadata";

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

  const getDynamicFields = () => {
    if (taskConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <SalesforceBulkMigrationTaskGitBranchTextInput
              fieldName={"gitBranch"}
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
              visible={taskConfigurationModel?.getData("isNewBranch") === true}
            />
          </Col>
          <Col lg={12}>
            <SalesforceBulkMigrationTaskUpstreamBranchSelectInput
              model={taskConfigurationModel}
              setModel={setTaskConfigurationModel}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <SalesforceBulkMigrationTaskGitBranchSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          visible={taskConfigurationModel?.getData("isNewBranch") !== true}
        />
      </Col>
    );
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <SalesforceBulkMigrationTaskJenkinsToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceBulkMigrationTaskSalesforceToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceBulkMigrationTaskJenkinsAccountSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          taskModel={taskModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceBulkMigrationTaskBitbucketWorkspaceSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceBulkMigrationTaskRepositorySelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <SalesforceBulkMigrationTaskNewBranchToggleInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

SalesforceBulkMigrationTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceBulkMigrationTaskConfigurationEditorPanel;


