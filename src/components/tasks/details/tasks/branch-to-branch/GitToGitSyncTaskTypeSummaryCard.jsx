import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import BooleanField from "components/common/fields/boolean/BooleanField";
import ArrayToTextField from "components/common/fields/text/ArrayToTextField";
import {Row, Col} from "react-bootstrap";

function GitToGitSyncTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  const getReviewerNamesField = () => {
    if (gitTaskConfigurationData?.getData("autoApprove") === true) {
      return (
        <ArrayToTextField dataObject={gitTaskConfigurationData} fieldName={"reviewerNames"} />
      );
    }
  };

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
       <Row className="mx-0 mb-2">
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"service"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitCredential"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"workspace"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"repository"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"sourceBranch"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitBranch"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <BooleanField dataObject={gitTaskConfigurationData} fieldName={"deleteSourceBranch"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <BooleanField dataObject={gitTaskConfigurationData} fieldName={"autoApprove"} />
        </Col>
        <Col xs={12} sm={6} md={4}>
          {getReviewerNamesField()}
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

GitToGitSyncTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default GitToGitSyncTaskTypeSummaryCard;
