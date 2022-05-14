import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SalesforceQuickDeployTaskTypeSummaryCard({ tasksData, taskConfigurationData, isLoading }) {
  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer gitTasksDataDto={tasksData} isLoading={isLoading}>
      <Row className="mx-0 mb-2">
        <Col xs={12} sm={6} md={4}>
          <ToolNameField model={taskConfigurationData} fieldName={"sfdcToolId"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={taskConfigurationData} fieldName={"deployKey"} />
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

SalesforceQuickDeployTaskTypeSummaryCard.propTypes = {
  tasksData: PropTypes.object,
  taskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SalesforceQuickDeployTaskTypeSummaryCard;
