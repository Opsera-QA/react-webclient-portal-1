import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";

function AwsLambdaTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"functionName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"role"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"runtime"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"handler"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"functionArn"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"awsToolConfigId"} />
      </div>
    </GitTasksSummaryCardContainer>
  );
}

AwsLambdaTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default AwsLambdaTaskTypeSummaryCard;