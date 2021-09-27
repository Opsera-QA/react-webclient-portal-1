import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/git_task_details/configuration_forms/TaskSummaryCardContainer";

function AwsLambdaTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"functionName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"role"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"runtime"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"handler"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"functionArn"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"awsToolConfigId"} />
      </div>
    </TaskSummaryCardContainer>
  );
}

AwsLambdaTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default AwsLambdaTaskTypeSummaryCard;