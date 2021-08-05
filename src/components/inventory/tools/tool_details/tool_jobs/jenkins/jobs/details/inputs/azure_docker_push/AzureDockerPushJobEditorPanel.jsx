import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsJobsGenericAgentTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/JenkinsJobsGenericAgentTypeSelectInput";
import AzureDockerPushJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/azure_docker_push/azure-docker-push-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function AzureDockerPushJobEditorPanel({ jenkinsJobConfiguration, model, setModel, autoScalingEnabled }) {
  useEffect(() => {
    unpackJobConfiguration();
  }, [jenkinsJobConfiguration]);

  const unpackJobConfiguration = () => {
    const parsedModel = modelHelpers.parseObjectIntoModel(jenkinsJobConfiguration, AzureDockerPushJobMetadata);
    setModel({...parsedModel});
  };

  const getAutoScalingField = () => {
    if (autoScalingEnabled === true) {
      return (
        <Col lg={6}>
          <JenkinsJobsGenericAgentTypeSelectInput
            model={model}
            setModel={setModel}
          />
        </Col>
      );
    }
  };

  if (!model) {
    return <></>;
  }

  return (
    <Row>
      <Col lg={6}>
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"buildType"}
          disabled={true}
        />
      </Col>
      {getAutoScalingField()}
    </Row>
  );
}

AzureDockerPushJobEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  autoScalingEnabled: PropTypes.bool,
};

export default AzureDockerPushJobEditorPanel;
