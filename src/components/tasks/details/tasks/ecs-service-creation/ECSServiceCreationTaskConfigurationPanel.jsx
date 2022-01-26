import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import ec2ServiceCreationTaskConfigurationMetadata from "./ecs-service-creation-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import ClusterTemplateSelectInput from "./inputs/ClusterTemplateSelectInput";
import VpcSelectInput from "./inputs/VpcSelectInput";
import ClusterSelectInput from "./inputs/ClusterSelectInput";
import LoadBalancerSelectInput from "./inputs/LoadBalancerSelectInput";
import NetworkingOnlySubForm from "../ecs-cluster-creation/sub_forms/NetworkingOnlySubForm";
import EC2SubForm from "../ecs-cluster-creation/sub_forms/EC2SubForm";
import IAMRoleSelectInput from "./inputs/IAMRoleSelectInput";
import SubnetSelectInput from "./inputs/SubnetSelectInput";
import LogGroupSelectInput from "./inputs/LogGroupSelectInput";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";
import AWSRegionSelectInput from "../../../../common/list_of_values_input/aws/AWSRegionSelectInput";

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
    if(gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities") && gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities") === "FARGATE"){
      return (
        <>
        <Col lg={12}>
          <IAMRoleSelectInput
            dataObject={gitTasksConfigurationData}
            setDataObject={setGitTasksConfigurationData}
            disabled={gitTasksConfigurationData?.getData("toolConfigId").length === 0 || gitTasksConfigurationData?.getData("region").length === 0}
            toolConfigId={gitTasksConfigurationData?.getData("toolConfigId")}
          />
        </Col>
      <Col lg={12}>
        <SubnetSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("ecsServiceVpcId").length === 0}
          vpc={gitTasksConfigurationData?.getData("ecsServiceVpcId")}
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
        <AWSRegionSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"region"}
          disabled={gitTasksConfigurationData?.getData("toolConfigId")?.length === 0}
          awsTool={gitTasksConfigurationData?.getData("toolConfigId")}
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
        <ClusterSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={
            gitTasksConfigurationData?.getData("toolConfigId")?.length === 0 ||
            gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities")?.length === 0 ||
            gitTasksConfigurationData?.getData("region")?.length === 0
          }
          requiresCompatibilities={gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities")}
          region={gitTasksConfigurationData?.getData("region")}
        />
      </Col>
      <Col lg={12}>
        <VpcSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("toolConfigId").length === 0 || gitTasksConfigurationData?.getData("region").length === 0}
          toolConfigId={gitTasksConfigurationData?.getData("toolConfigId")}
          region={gitTasksConfigurationData?.getData("region")}
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
        <LogGroupSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("toolConfigId").length === 0 || gitTasksConfigurationData?.getData("region").length === 0}
          toolConfigId={gitTasksConfigurationData?.getData("toolConfigId")}
          region={gitTasksConfigurationData?.getData("region")}
        />
      </Col>
      <Col lg={12}>
        <LoadBalancerSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("ecsServiceVpcId").length === 0 || gitTasksConfigurationData?.getData("region").length === 0}
          vpcId={gitTasksConfigurationData?.getData("ecsServiceVpcId")}
          region={gitTasksConfigurationData?.getData("region")}
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
