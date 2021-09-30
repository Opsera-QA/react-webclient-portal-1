import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/git_task_details/configuration_forms/TaskSummaryCardContainer";
import BooleanField from "components/common/fields/boolean/BooleanField";

function GitToGitSyncTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  const getReviewerNamesField = () => {
    if (gitTaskConfigurationData?.getData("autoApprove") === true) {
      return (
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"reviewerNames"} />
      );
    }
  };

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"service"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitCredential"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"workspace"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"repository"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"sourceBranch"} />        
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitBranch"} />
        <BooleanField fieldName={"deleteSourceBranch"} dataObject={gitTaskConfigurationData} />
        <BooleanField fieldName={"autoApprove"} dataObject={gitTaskConfigurationData} />
        {getReviewerNamesField()}
      </div>
    </TaskSummaryCardContainer>
  );
}

GitToGitSyncTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default GitToGitSyncTaskTypeSummaryCard;
