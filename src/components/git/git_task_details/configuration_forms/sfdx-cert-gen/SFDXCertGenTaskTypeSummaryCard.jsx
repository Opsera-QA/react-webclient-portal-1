import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";

function SFDXCertGenTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {
  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"toolName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"countryName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"state"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"locality"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"organization"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"unitName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"commonName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"email"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"expiryDate"} />
      </div>
    </GitTasksSummaryCardContainer>
  );
}

SFDXCertGenTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SFDXCertGenTaskTypeSummaryCard;
