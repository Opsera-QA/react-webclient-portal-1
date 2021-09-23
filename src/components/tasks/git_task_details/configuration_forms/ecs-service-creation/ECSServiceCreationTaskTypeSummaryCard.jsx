import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import GitTasksSummaryCardContainer from "components/tasks/git_task_details/configuration_forms/GitTasksSummaryCardContainer";

function ECSServiceCreationTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  const getDynamicFields = () => {
    if(gitTaskConfigurationData?.getData("ecsServiceRequiresCompatibilities") && gitTaskConfigurationData?.getData("ecsServiceRequiresCompatibilities") === "FARGATE"){
      return (
        <>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsServiceExecutionRoleArn"} />
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsServiceSubnets"} />

        </>
      );
    }
  };

  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsClusterName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsServiceDesiredCount"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsServiceVpcId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsServiceRequiresCompatibilities"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsServiceLoadBalancerArn"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"toolConfigId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"ecsServiceLogGroup"} />
        {getDynamicFields()}
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
