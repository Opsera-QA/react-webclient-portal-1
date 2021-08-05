import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsShellScriptJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/shell_script/jenkins-shell-script-metadata";
import JenkinsJobsGenericAgentTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/JenkinsJobsGenericAgentTypeSelectInput";
import JenkinsJobsShellScriptBuildTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/shell_script/JenkinsJobsShellScriptBuildTypeSelectInput";
import JenkinsJobsPythonAgentLabelSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/JenkinsJobsPythonAgentLabelSelectInput";

function JenkinsShellScriptEditorPanel({ jenkinsJobConfiguration, model, setModel, autoScalingEnabled }) {
  useEffect(() => {
    unpackJobConfiguration();
  }, [jenkinsJobConfiguration]);

  const unpackJobConfiguration = () => {
    const parsedModel = modelHelpers.parseObjectIntoModel(jenkinsJobConfiguration, JenkinsShellScriptJobMetadata);
    setModel({...parsedModel});
  };

  const getAutoScalingField = () => {
    if (autoScalingEnabled === true && model) {
      if (model?.getData("buildType") === "python") {
        return (
          <Col lg={6}>
            <JenkinsJobsPythonAgentLabelSelectInput
              model={model}
              setModel={setModel}
            />
          </Col>
        );
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
  };

  if (!model) {
    return <></>;
  }

  return (
    <Row>
      <Col lg={6}>
        <JenkinsJobsShellScriptBuildTypeSelectInput
          model={model}
          setModel={setModel}
          fieldName="buildType"
        />
      </Col>
      {getAutoScalingField()}
    </Row>
  );
}

JenkinsShellScriptEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  autoScalingEnabled: PropTypes.bool,
};

export default JenkinsShellScriptEditorPanel;
