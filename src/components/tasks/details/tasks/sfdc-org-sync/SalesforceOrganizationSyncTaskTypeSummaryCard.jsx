import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function SalesforceOrganizationSyncTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {
  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <Row className="mx-0 mb-2">
        <Col xs={12} sm={6} md={4}>
          <ToolNameField model={gitTaskConfigurationData} fieldName={"toolConfigId"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <ToolNameField model={gitTaskConfigurationData} fieldName={"sfdcToolId"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"service"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitCredential"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"repository"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitBranch"} />
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

SalesforceOrganizationSyncTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskTypeSummaryCard;
