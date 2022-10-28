import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import ec2ClusterCreationTaskConfigurationMetadata from "./ecs-creation-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import ClusterTemplateSelectInput from "./inputs/ClusterTemplateSelectInput";
import NetworkingOnlySubForm from "./sub_forms/NetworkingOnlySubForm";
import EcsClusterCreationTaskConfigurationEc2EditorPanel from "components/tasks/details/tasks/ecs-cluster-creation/sub_forms/EcsClusterCreationTaskConfigurationEc2EditorPanel";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";
import AwsCloudProviderRegionSelectInput
  from "components/common/list_of_values_input/aws/regions/AwsCloudProviderRegionSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function Ec2ClusterCreationTaskConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), ec2ClusterCreationTaskConfigurationMetadata);
    setGitTasksConfigurationData({...configurationData});
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicFields = () => {
    switch (gitTasksConfigurationData?.getData("clusterTemplate")) {
      case "fargate":
        return (
          <Col lg={12}>
            <NetworkingOnlySubForm
              dataObject={gitTasksConfigurationData}
              setDataObject={setGitTasksConfigurationData}
            />
          </Col>
        );
      case "ec2":
        return (
          <Col lg={12}>
            <EcsClusterCreationTaskConfigurationEc2EditorPanel
              dataObject={gitTasksConfigurationData}
              setDataObject={setGitTasksConfigurationData}
            />
          </Col>
        );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <RoleRestrictedAwsAccountToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"awsToolId"}
        />
      </Col>
      <Col lg={12}>
        <AwsCloudProviderRegionSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"region"}
          disabled={isMongoDbId(gitTasksConfigurationData?.getData("awsToolId")) !== true} // TODO: is this necessary? Region is separate from tool
        />
      </Col>
      <Col lg={12}>
        <ClusterTemplateSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"clusterTemplate"}
          disabled={hasStringValue(gitTasksDataDto.getData("configuration.stackId") === true)}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"clusterName"}
        />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

Ec2ClusterCreationTaskConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default Ec2ClusterCreationTaskConfigurationPanel;


