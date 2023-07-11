import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsGenericJobMetadata from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/generic/jenkins-generic-job-metadata";
import JenkinsJobsGenericAgentTypeSelectInput from "components/common/list_of_values_input/tools/jenkins/jobs/JenkinsJobsGenericAgentTypeSelectInput";
import Row from "react-bootstrap/Row";

function JenkinsGenericJobEditorPanel({ jenkinsJobConfiguration, model, setModel, autoScalingEnabled, jenkinsJobType }) {
  useEffect(() => {
    unpackJobConfiguration();
  }, [jenkinsJobConfiguration]);

  const unpackJobConfiguration = () => {
    const parsedModel = modelHelpers.parseObjectIntoModel(jenkinsJobConfiguration, JenkinsGenericJobMetadata);
    setModel({...parsedModel});
  };

  if (model == null || autoScalingEnabled !== true) {
    return null;
  }

  return (
    <Row>
      <Col lg={6}>
        <JenkinsJobsGenericAgentTypeSelectInput
          model={model}
          setModel={setModel}
          jenkinsJobType={jenkinsJobType}
        />
      </Col>
    </Row>
  );
}

JenkinsGenericJobEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  autoScalingEnabled: PropTypes.bool,
  jenkinsJobType: PropTypes.string
};

export default JenkinsGenericJobEditorPanel;
