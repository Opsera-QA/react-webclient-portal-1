import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";

function BranchToBranchGitTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"toolName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"service"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitCredential"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"workspace"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"repository"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"sourceBranch"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"gitBranch"} />        
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"reviewers"} />
      </div>
    </GitTasksSummaryCardContainer>
  );
}

BranchToBranchGitTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default BranchToBranchGitTaskTypeSummaryCard;
