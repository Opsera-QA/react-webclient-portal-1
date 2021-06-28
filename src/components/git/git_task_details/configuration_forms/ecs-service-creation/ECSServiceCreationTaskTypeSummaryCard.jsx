import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";

function ECSServiceCreationTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clusterName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"serviceName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"desiredCount"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"containerPort"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"requiresCompatibilities"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"vpcId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"imageUrl"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"loadBalancerArn"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"awsToolId"} />
      </div>
    </GitTasksSummaryCardContainer>
  );
}

ECSServiceCreationTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ECSServiceCreationTaskTypeSummaryCard;
