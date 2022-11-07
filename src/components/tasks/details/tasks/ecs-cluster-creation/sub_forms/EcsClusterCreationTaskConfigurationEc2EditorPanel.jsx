import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";
import ImageTypeSelectInput from "../inputs/ImageTypeSelect";
import AwsEcsInstanceTypeSelectInput
  from "components/common/list_of_values_input/aws/ecs/instances/AwsEcsInstanceTypeSelectInput";
import AwsKeyPairSelectInput from "components/common/list_of_values_input/aws/key_pairs/AwsKeyPairSelectInput";
import AwsSecurityGroupSelectInput
  from "components/common/list_of_values_input/aws/security_groups/AwsSecurityGroupSelectInput";
import EcsCreationTaskVpcBooleanToggleInput
  from "components/tasks/details/tasks/ecs-cluster-creation/inputs/EcsCreationTaskVpcBooleanToggleInput";
import AwsVpcSelectInput from "components/common/list_of_values_input/aws/vpcs/AwsVpcSelectInput";
import AwsSubnetMultiSelectInput from "components/common/list_of_values_input/aws/subnets/AwsSubnetMultiSelectInput";

function EcsClusterCreationTaskConfigurationEc2EditorPanel({ dataObject, setDataObject }) {
  const getDynamicFields = () => {
    if (dataObject?.getData("createVpc") === true) {
      return (
        <>
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"vpcCidrBlock"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"public_subnet_cidr_1"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"public_subnet_cidr_2"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"private_subnet_cidr_1"} />
          <TextInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"private_subnet_cidr_2"} />
        </>
      );
    } else {
      return (
        <>
          <AwsVpcSelectInput
            fieldName={"vpcId"}
            model={dataObject}
            setModel={setDataObject}
            awsToolId={dataObject?.getData("awsToolId")}
            region={dataObject?.getData("region")}
          />
          <AwsSubnetMultiSelectInput
            fieldName={"privateSubnets"}
            model={dataObject}
            setModel={setDataObject}
            vpcId={dataObject?.getData("vpcId")}
            awsToolId={dataObject?.getData("awsToolId")}
          />
        </>
      );
    }
  };

  return (
    <>
      <ImageTypeSelectInput
        dataObject={dataObject}
        setDataObject={setDataObject}
      />
      <AwsEcsInstanceTypeSelectInput
        fieldName={"instanceType"}
        model={dataObject}
        setModel={setDataObject}
        disabled={dataObject?.getData("awsToolId")?.length === 0}
        imageType={dataObject?.getData("imageType")}
      />
      <AwsKeyPairSelectInput
        fieldName={"keyPair"}
        model={dataObject}
        setModel={setDataObject}
        awsToolId={dataObject?.getData("awsToolId")}
        region={dataObject?.getData("region")}
      />
      <EcsCreationTaskVpcBooleanToggleInput
        model={dataObject}
        setModel={setDataObject}
        fieldName={"createVpc"}
      />
      {getDynamicFields()}
      <AwsSecurityGroupSelectInput
        fieldName={"securityGroup"}
        model={dataObject}
        setModel={setDataObject}
        awsToolId={dataObject?.getData("awsToolId")}
        region={dataObject?.getData("region")}
      />
    </>
  );
}

EcsClusterCreationTaskConfigurationEc2EditorPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default EcsClusterCreationTaskConfigurationEc2EditorPanel;
