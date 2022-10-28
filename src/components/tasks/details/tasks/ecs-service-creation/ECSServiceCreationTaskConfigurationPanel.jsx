import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import ec2ServiceCreationTaskConfigurationMetadata from "./ecs-service-creation-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import ClusterTemplateSelectInput from "./inputs/ClusterTemplateSelectInput";
import AwsLogGroupSelectInput from "components/common/list_of_values_input/tools/aws/log_groups/AwsLogGroupSelectInput";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";
import AwsCloudProviderRegionSelectInput
  from "components/common/list_of_values_input/aws/regions/AwsCloudProviderRegionSelectInput";
import AwsVpcSelectInput from "components/common/list_of_values_input/aws/vpcs/AwsVpcSelectInput";
import AwsSubnetMultiSelectInput from "components/common/list_of_values_input/aws/subnets/AwsSubnetMultiSelectInput";
import AwsClusterSelectInput from "components/common/list_of_values_input/aws/cluster/AwsClusterSelectInput";
import AwsLoadBalancerSelectInput
  from "components/common/list_of_values_input/aws/load_balancers/AwsLoadBalancerSelectInput";
import AwsIamRoleSelectInput from "components/common/list_of_values_input/aws/iam_roles/AwsIamRoleSelectInput";

function ECSServiceCreationTaskConfigurationPanel({
  gitTasksDataDto,
  gitTasksConfigurationData,
  setGitTasksConfigurationData,
}) {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      gitTasksDataDto.getData("configuration"),
      ec2ServiceCreationTaskConfigurationMetadata
    );
    setGitTasksConfigurationData({ ...configurationData });
  };

  const getDynamicFields = () => {
    if (gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities") && gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities") === "FARGATE") {
      return (
        <>
          <Col lg={12}>
            <AwsIamRoleSelectInput
              fieldName={"ecsServiceExecutionRoleArn"}
              model={gitTasksConfigurationData}
              setModel={setGitTasksConfigurationData}
              awsToolId={gitTasksConfigurationData?.getData("toolConfigId")}
              region={gitTasksConfigurationData?.getData("regions")}
            />
          </Col>
          <Col lg={12}>
            <AwsSubnetMultiSelectInput
              fieldName={"ecsServiceSubnets"}
              model={gitTasksConfigurationData}
              setModel={setGitTasksConfigurationData}
              vpcId={gitTasksConfigurationData?.getData("ecsServiceVpcId")}
              awsToolId={gitTasksConfigurationData?.getData("toolConfigId")}
            />
          </Col>
        </>
      );
    }
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <RoleRestrictedAwsAccountToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"toolConfigId"}
        />
      </Col>
      <Col lg={12}>
        <AwsCloudProviderRegionSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"regions"}
          disabled={gitTasksConfigurationData?.getData("toolConfigId")?.length === 0}
        />
      </Col>
      <Col lg={12}>
        <ClusterTemplateSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"ecsServiceRequiresCompatibilities"}
        />
      </Col>
      <Col lg={12}>
        <AwsClusterSelectInput
          fieldName={"ecsClusterName"}
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          awsToolId={gitTasksConfigurationData?.getData("toolConfigId")}
          type={gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities")}
          region={gitTasksConfigurationData?.getData("regions")}
        />
      </Col>
      <Col lg={12}>
        <AwsVpcSelectInput
          fieldName={"ecsServiceVpcId"}
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          awsToolId={gitTasksConfigurationData?.getData("toolConfigId")}
          region={gitTasksConfigurationData?.getData("regions")}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"ecsServiceDesiredCount"}
        />
      </Col>
      <Col lg={12}>
        <AwsLogGroupSelectInput
          fieldName={"ecsServiceLogGroup"}
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          awsToolId={gitTasksConfigurationData?.getData("toolConfigId")}
          region={gitTasksConfigurationData?.getData("regions")}
        />
      </Col>
      <Col lg={12}>
        <AwsLoadBalancerSelectInput
          fieldName={"ecsServiceLoadBalancerArn"}
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          awsToolId={gitTasksConfigurationData?.getData("toolConfigId")}
          vpcId={gitTasksConfigurationData?.getData("ecsServiceVpcId")}
          region={gitTasksConfigurationData?.getData("regions")}
        />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

ECSServiceCreationTaskConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default ECSServiceCreationTaskConfigurationPanel;
