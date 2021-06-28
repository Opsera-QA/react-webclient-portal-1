import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import ec2ServiceCreationTaskConfigurationMetadata from "./ecs-service-creation-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AWSToolSelectInput from "./inputs/AWSToolSelectInput";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import ClusterTemplateSelectInput from "./inputs/ClusterTemplateSelectInput";
import VPCSelectInput from "./inputs/VPCSelectInput";

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

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <AWSToolSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"awsToolId"}
        />
      </Col>
      <Col lg={12}>
        <ClusterTemplateSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"clusterTemplate"}
        />
      </Col>
      <Col lg={12}>
      <VPCSelectInput
        dataObject={gitTasksConfigurationData}
        setDataObject={setGitTasksConfigurationData}
        disabled={gitTasksConfigurationData?.getData("awsToolId").length === 0}
        awsToolId={gitTasksConfigurationData?.getData("awsToolId")}
      />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"clusterName"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"serviceName"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"desiredCount"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"containerPort"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"imageUrl"}
        />
      </Col>
    </Row>
  );
}

ECSServiceCreationTaskConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default ECSServiceCreationTaskConfigurationPanel;
