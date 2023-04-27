import React from "react";
import PropTypes from "prop-types";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import TextFieldBase from "../../../../common/fields/text/TextFieldBase";
import TaskMigrationTypeField from "../../../../common/fields/tasks/TaskMigrationTypeField";
import { MIGRATION_TYPES } from "./inputs/SalesforceCustomSettingTaskTypeSelectInput";

function SalesforceCustomSettingMigrationTaskSummaryCard(
  {
    taskConfigDataModel,
    salesforceConfigurationModel,
    isLoading,
  }) {

  if (isLoading || taskConfigDataModel == null || salesforceConfigurationModel == null) {
    return (
      <TaskSummaryCardContainer
        isLoading={isLoading}
      />
    );
  }

  return (
    <TaskSummaryCardContainer isLoading={isLoading}>
      <Row>
        <Col xs={6}>
          <TaskMigrationTypeField
            model={taskConfigDataModel}
            fieldName={"taskType"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigDataModel}
            fieldName={"action"}
            visible={taskConfigDataModel?.getData("taskType") !== MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV}
          />
        </Col>
        <Col xs={6}>
          <ToolNameField
            model={salesforceConfigurationModel}
            fieldName={"sourceToolId"}
          />
        </Col>
        <Col xs={6}>
          <ToolNameField
            model={salesforceConfigurationModel}
            fieldName={"targetToolId"}
            visible={taskConfigDataModel?.getData("taskType") === MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_ORG}
          />
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

SalesforceCustomSettingMigrationTaskSummaryCard.propTypes = {
  taskConfigDataModel: PropTypes.object,
  salesforceConfigurationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SalesforceCustomSettingMigrationTaskSummaryCard;
