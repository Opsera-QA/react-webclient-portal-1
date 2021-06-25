import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import BooleanField from "../../../../common/fields/boolean/BooleanField";

function EC2ClusterCreationTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"vpcCidrBlock"} />
        <BooleanField dataObject={gitTaskConfigurationData} fieldName={"createVpc"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clusterName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"awsToolId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clusterTemplate"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"public_subnet_1"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"public_subnet_2"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"private_subnet_cidr_1"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"private_subnet_cidr_2"} />
      </div>
    </GitTasksSummaryCardContainer>
  );
}

EC2ClusterCreationTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default EC2ClusterCreationTaskTypeSummaryCard;
