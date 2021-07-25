import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import JenkinsJobsShellScriptBuildTypeSelectInput from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/shell_script/JenkinsJobsShellScriptBuildTypeSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsShellScriptJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/shell_script/jenkins-shell-script-metadata";

function JenkinsShellScriptEditorPanel({ jenkinsJobConfiguration, model, setModel }) {
  useEffect(() => {
    unpackJobConfiguration();
  }, [jenkinsJobConfiguration]);

  const unpackJobConfiguration = () => {
    const parsedModel = modelHelpers.parseObjectIntoModelBase(jenkinsJobConfiguration, JenkinsShellScriptJobMetadata);
    setModel({...parsedModel});
  };

  if (!model) {
    return <></>;
  }

  return (
    <Row>
      <Col lg={6}>
        <JenkinsJobsShellScriptBuildTypeSelectInput
          model={model}
          setDataObject={setModel}
          fieldName="buildType"
        />
      </Col>
    </Row>
  );
}

JenkinsShellScriptEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default JenkinsShellScriptEditorPanel;
