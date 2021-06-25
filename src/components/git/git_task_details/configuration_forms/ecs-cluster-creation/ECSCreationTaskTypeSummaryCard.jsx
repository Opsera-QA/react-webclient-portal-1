import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import GitTasksSummaryCardContainer from "components/git/git_task_details/configuration_forms/GitTasksSummaryCardContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import BooleanField from "../../../../common/fields/boolean/BooleanField";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import VPCSelectInput from "./inputs/VPCSelectInput";
import SubnetSelectInput from "./inputs/SubnetSelectInput";
import CodeFieldBase from "../../../../common/fields/code/CodeFieldBase";

function EC2ClusterCreationTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <GitTasksSummaryCardContainer isLoading={isLoading} />;
  }

  const getEC2VPCFields = () => {
    if (gitTaskConfigurationData.getData("clusterTemplate") === "ec2") {
      if (gitTaskConfigurationData.getData("createVpc")) {
        return (
          <>
            <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"vpcCidrBlock"} />
            <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"public_subnet_cidr_1"} />
            <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"public_subnet_cidr_2"} />
            <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"private_subnet_cidr_1"} />
            <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"private_subnet_cidr_2"} />
          </>
        );
      } else {
        return (
          <>
            <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"vpcId"} />
            <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"privateSubnets"} />
          </>
        );
      }
    }
  };

  const getEC2GenFields = () => {
    if (gitTaskConfigurationData.getData("clusterTemplate") === "ec2") {
      return (
        <>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"keyPair"} />
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"instanceType"} />
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"securityGroup"} />
        </>
      );
    }
  };

  const getFargateFields = () => {
    if (gitTaskConfigurationData.getData("clusterTemplate") === "fargate") {
      return (
        <>
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"public_subnet_1"} />
          <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"public_subnet_2"} />
        </>
      );
    }
    };

  return (
    <GitTasksSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"vpcCidrBlock"} />
        <BooleanField dataObject={gitTaskConfigurationData} fieldName={"createVpc"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clusterName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"awsToolId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clusterTemplate"} />
        {getEC2VPCFields()}
        {getEC2GenFields()}
        {getFargateFields()}
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
