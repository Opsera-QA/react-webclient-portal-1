import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/git_task_details/configuration_forms/TaskSummaryCardContainer";

function SFDCBranchStructuringTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {
  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"toolName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"conversionType"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"service"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitCredential"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"repository"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitBranch"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"destinationBranch"} />
      </div>
    </TaskSummaryCardContainer>
  );
}

SFDCBranchStructuringTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SFDCBranchStructuringTaskTypeSummaryCard;
