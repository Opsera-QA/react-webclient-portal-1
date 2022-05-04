import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  mergeSyncTaskConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/mergeSyncTaskConfiguration.metadata";
import { TASK_TYPES } from "components/tasks/task.types";
import {
  mergeSyncTaskSalesforceConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/mergeSyncTaskSalesforceConfiguration.metadata";
import SalesforceMergeSyncTaskSalesforceToolSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceMergeSyncTaskSalesforceToolSelectInput";

function SalesforceToSalesforceMergeSyncTaskConfigurationEditorPanel({
  taskModel,
  taskConfigurationModel,
  setTaskConfigurationModel,
}) {
  const [salesforceConfigurationModel, setSalesforceConfigurationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      taskModel?.getData("configuration"),
      mergeSyncTaskConfigurationMetadata,
    );
    configurationData?.setData("jobType", TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC);
    setTaskConfigurationModel({ ...configurationData });
    const newSalesforceToGitSyncModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("sfdc"),
      mergeSyncTaskSalesforceConfigurationMetadata,
    );
    setSalesforceConfigurationModel({...newSalesforceToGitSyncModel});
  };

  const setModelFunction = (newModel) => {
    setSalesforceConfigurationModel({...newModel});
    // taskConfigurationModel?.setData("git", {});
    taskConfigurationModel?.setData("sfdc", salesforceConfigurationModel?.getPersistData());
    setTaskConfigurationModel({...taskConfigurationModel});
  };

  if (taskModel == null || taskConfigurationModel == null || salesforceConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <SalesforceMergeSyncTaskSalesforceToolSelectInput
          model={salesforceConfigurationModel}
          setModel={setModelFunction}
          fieldName={"sourceToolId"}
        />
      </Col>
      <Col lg={12}>
        <SalesforceMergeSyncTaskSalesforceToolSelectInput
          model={salesforceConfigurationModel}
          setModel={setModelFunction}
          fieldName={"targetToolId"}
        />
      </Col>
    </Row>
  );
}

SalesforceToSalesforceMergeSyncTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceToSalesforceMergeSyncTaskConfigurationEditorPanel;
