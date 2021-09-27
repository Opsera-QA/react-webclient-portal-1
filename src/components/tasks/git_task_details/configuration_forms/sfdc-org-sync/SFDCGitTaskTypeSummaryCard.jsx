import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/git_task_details/configuration_forms/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";

function SFDCGitTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {
  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <Row className="mx-0 mb-2">
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"toolName"} />
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

SFDCGitTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SFDCGitTaskTypeSummaryCard;
