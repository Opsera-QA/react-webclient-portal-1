import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import BooleanField from "../../../../common/fields/boolean/BooleanField";

function EC2ClusterCreationTaskTypeSummaryCard({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
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
        }
      }
  };

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <BooleanField dataObject={gitTaskConfigurationData} fieldName={"createVpc"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clusterName"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"awsToolId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"clusterTemplate"} />
        {getEC2VPCFields()}
        {getEC2GenFields()}
        {getFargateFields()}
      </div>
    </TaskSummaryCardContainer>
  );
}

EC2ClusterCreationTaskTypeSummaryCard.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default EC2ClusterCreationTaskTypeSummaryCard;
