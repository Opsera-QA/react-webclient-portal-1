import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsGenericJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/generic/jenkins-generic-job-metadata";
import JenkinsJobsGenericAgentTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/JenkinsJobsGenericAgentTypeSelectInput";

function JenkinsGenericJobEditorPanel({ jenkinsJobConfiguration, model, setModel, autoScalingEnabled }) {
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
    <Col lg={6}>
      <JenkinsJobsGenericAgentTypeSelectInput
        model={model}
        setModel={setModel}
      />
    </Col>
  );
}

JenkinsGenericJobEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  autoScalingEnabled: PropTypes.bool,
};

export default JenkinsGenericJobEditorPanel;
