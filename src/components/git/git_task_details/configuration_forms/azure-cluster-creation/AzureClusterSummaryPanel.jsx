import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";

function AzureClusterConfigurationPanel({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clustername"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"region"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"disk_size_gb"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"node_min_count"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"node_max_count"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"machine_type"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"vpcCIDRblock"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"subnetCIDRblock"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"azureToolConfigId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"azureCredentialId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"aksKubeVersion"} />
      </div>
    </GitTasksSummaryCardContainer>
  );
}

AzureClusterConfigurationPanel.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default AzureClusterConfigurationPanel;