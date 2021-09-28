import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/git_task_details/configuration_forms/TaskSummaryCardContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function BranchToBranchTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
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
    </TaskSummaryCardContainer>
  );
}

BranchToBranchTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default BranchToBranchTaskTypeSummaryCard;
