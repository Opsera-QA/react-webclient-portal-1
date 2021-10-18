import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SalesforceBulkMigrationTaskTypeSummaryCard({ taskModel, taskConfigurationModel, isLoading }) {
  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  console.log("taskConfigurationModel: " + JSON.stringify(taskConfigurationModel?.getPersistData()));
  
  return (
    <TaskSummaryCardContainer taskModelDto={taskModel} isLoading={isLoading}>
      <Row className="mx-0 mb-2">
        <Col xs={12} sm={6} md={4}>
          <ToolNameField model={taskConfigurationModel} fieldName={"toolConfigId"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <ToolNameField model={taskConfigurationModel} fieldName={"sfdcToolId"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={taskConfigurationModel} fieldName={"service"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={taskConfigurationModel} fieldName={"gitCredential"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={taskConfigurationModel} fieldName={"repository"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={taskConfigurationModel} fieldName={"gitBranch"} />
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

SalesforceBulkMigrationTaskTypeSummaryCard.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SalesforceBulkMigrationTaskTypeSummaryCard;
