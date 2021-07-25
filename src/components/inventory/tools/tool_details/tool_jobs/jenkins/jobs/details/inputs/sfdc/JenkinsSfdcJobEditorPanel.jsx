import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import JenkinsJobsSfdcTypeSelectInput from "./JenkinsJobsSfdcTypeSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsSfdcJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/sfdc/jenkins-sfdc-build-metadata";

function JenkinsSfdcJobEditorPanel({ jenkinsJobConfiguration, model, setModel }) {
  useEffect(() => {
    unpackJobConfiguration();
  }, [jenkinsJobConfiguration]);

  const unpackJobConfiguration = () => {
    const parsedModel = modelHelpers.parseObjectIntoModelBase(jenkinsJobConfiguration, JenkinsSfdcJobMetadata);
    setModel({...parsedModel});
  };

  if (!model) {
    return <></>;
  }

  return (
    <Row>
      <Col lg={6}>
        <JenkinsJobsSfdcTypeSelectInput 
          model={model} 
          setModel={setModel} 
          fieldName="jobType" 
        />
      </Col>
    </Row>
  );
}

JenkinsSfdcJobEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default JenkinsSfdcJobEditorPanel;
