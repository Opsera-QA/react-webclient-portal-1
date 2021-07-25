import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsShellScriptJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/shell_script/jenkins-shell-script-metadata";

function JenkinsDockerPushEditorPanel({ jenkinsJobConfiguration, model, setModel, type }) {
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
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"buildType"}
          disabled={type === "DOCKER PUSH"}
        />
      </Col>
    </Row>
  );
}

JenkinsDockerPushEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  type: PropTypes.string,
};

export default JenkinsDockerPushEditorPanel;
