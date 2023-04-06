import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceMergeSyncTaskSalesforceToolSelectInput from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceMergeSyncTaskSalesforceToolSelectInput";
import salesforceCustomSettingMigrationTaskMetadata, {
  customSettingTaskSalesforceConfigurationMetadata,
} from "./salesforceCustomSettingMigrationTaskMetadata";
import SalesforceCustomSettingTaskActionSelectInput from "./inputs/SalesforceCustomSettingTaskActionSelectInput";
import SalesforceCustomSettingTaskTypeSelectInput, {
  MIGRATION_TYPES,
} from "./inputs/SalesforceCustomSettingTaskTypeSelectInput";

function SalesforceCustomSettingMigrationTaskEditorPanel({
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
      salesforceCustomSettingMigrationTaskMetadata,
    );
    // configurationData?.setData("jobType", TASK_TYPES.SALESFORCE_CUSTOM_SETTING_MIGRATION);
    setTaskConfigurationModel({ ...configurationData });
    const newTaskModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("sfdc"),
      customSettingTaskSalesforceConfigurationMetadata,
    );
    setSalesforceConfigurationModel({ ...newTaskModel });
  };

  const setSalesforceModelFunction = (newModel) => {
    setSalesforceConfigurationModel({ ...newModel });
    // taskConfigurationModel?.setData("git", {});
    taskConfigurationModel?.setData(
      "sfdc",
      salesforceConfigurationModel?.getPersistData(),
    );
    setTaskConfigurationModel({ ...taskConfigurationModel });
  };

  const setTaskTypeFunction = (fieldName, selectedOption) => {
    let newModel = taskConfigurationModel;
    newModel.setData("taskType", selectedOption?.value);

    let newSalesforceConfigModel = { ...salesforceConfigurationModel };
    newSalesforceConfigModel.setData("taskType", selectedOption?.value);
    setSalesforceConfigurationModel({ ...newSalesforceConfigModel });
    newModel?.setData("sfdc", salesforceConfigurationModel?.getPersistData());
    setTaskConfigurationModel({ ...newModel });
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
        <SalesforceCustomSettingTaskTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          setDataFunction={setTaskTypeFunction}
          fieldName={"taskType"}
        />
      </Col>
      {taskConfigurationModel.getData("taskType") !==
        MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG && (
        <Col lg={12}>
          <SalesforceMergeSyncTaskSalesforceToolSelectInput
            model={salesforceConfigurationModel}
            setModel={setSalesforceModelFunction}
            fieldName={"sourceToolId"}
          />
        </Col>
      )}
      {taskConfigurationModel.getData("taskType") !==
        MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV && (
        <Col lg={12}>
          <SalesforceMergeSyncTaskSalesforceToolSelectInput
            model={salesforceConfigurationModel}
            setModel={setSalesforceModelFunction}
            fieldName={"targetToolId"}
          />
        </Col>
      )}
      {taskConfigurationModel.getData("taskType") !==
        MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV && (
        <Col lg={12}>
          <SalesforceCustomSettingTaskActionSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
            fieldName={"action"}
          />
        </Col>
      )}
    </Row>
  );
}

SalesforceCustomSettingMigrationTaskEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceCustomSettingMigrationTaskEditorPanel;
