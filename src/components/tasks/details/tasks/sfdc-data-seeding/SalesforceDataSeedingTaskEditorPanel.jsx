import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceMergeSyncTaskSalesforceToolSelectInput from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceMergeSyncTaskSalesforceToolSelectInput";
import dataSeedingMigrationTaskMetadata, { dataSeedingTaskSalesforceConfigurationMetadata } from "./salesforceDataSeedingTaskMetadata";
import SalesforceDataSeedingTaskActionSelectInput from "./inputs/SalesforceDataSeedingTaskActionSelectInput";

function SalesforceDataSeedingTaskEditorPanel({
  taskModel,
  taskConfigurationModel,
  setTaskConfigurationModel,
}) {
  const [salesforceConfigurationModel, setSalesforceConfigurationModel] =
    useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.parseObjectIntoModel(
      taskModel?.getData("configuration"),
      dataSeedingMigrationTaskMetadata,
    );
    // configurationData?.setData("jobType", TASK_TYPES.SALESFORCE_DATA_SEEDING);
    setTaskConfigurationModel({ ...configurationData });
    const newTaskModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("sfdc"),
      dataSeedingTaskSalesforceConfigurationMetadata,
    );
    setSalesforceConfigurationModel({ ...newTaskModel });
  };

  const setSalesforceModelFunction = (newModel) => {
    setSalesforceConfigurationModel({ ...newModel });
    taskConfigurationModel?.setData(
      "sfdc",
      salesforceConfigurationModel?.getPersistData(),
    );
    setTaskConfigurationModel({ ...taskConfigurationModel });
  };

  if (
    taskModel == null ||
    taskConfigurationModel == null ||
    salesforceConfigurationModel == null
  ) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <SalesforceMergeSyncTaskSalesforceToolSelectInput
          model={salesforceConfigurationModel}
          setModel={setSalesforceModelFunction}
          fieldName={"sourceToolId"}
        />
      </Col>
      <Col lg={12}>
        <SalesforceMergeSyncTaskSalesforceToolSelectInput
          model={salesforceConfigurationModel}
          setModel={setSalesforceModelFunction}
          fieldName={"targetToolId"}
        />
      </Col>
      <Col lg={12}>
        <SalesforceDataSeedingTaskActionSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          fieldName={"action"}
        />
      </Col>
    </Row>
  );
}

SalesforceDataSeedingTaskEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceDataSeedingTaskEditorPanel;
