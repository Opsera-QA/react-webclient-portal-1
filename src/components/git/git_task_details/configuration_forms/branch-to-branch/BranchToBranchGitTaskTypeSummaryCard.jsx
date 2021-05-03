import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
function BranchToBranchGitTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  console.log('BranchToBranchGitTaskTypeSummaryCard');

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
        <FieldContainer className="mb-2">
          <div className="w-100 d-flex">
            <FieldLabel field={gitTaskConfigurationData.getFieldById("deleteSourceBranch")}/>
            {gitTaskConfigurationData.getData("deleteSourceBranch") ? <span>True</span> : <span>False</span>}
          </div>
        </FieldContainer>
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"reviewerNames"} />
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
