import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsUnitTestJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/unit_testing/jenkins-unit-test-metadata";
import JenkinsJobsGenericAgentTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/JenkinsJobsGenericAgentTypeSelectInput";
import JenkinsJobsUnitTestingTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/unit_testing/JenkinsJobsUnitTestingTypeSelectInput";

function JenkinsUnitTestingEditorPanel({ jenkinsJobConfiguration, model, setModel, autoScalingEnabled }) {
  useEffect(() => {
    unpackJobConfiguration();
  }, [jenkinsJobConfiguration]);

  const unpackJobConfiguration = () => {
    const parsedModel = modelHelpers.parseObjectIntoModelBase(jenkinsJobConfiguration, JenkinsUnitTestJobMetadata);
    setModel({...parsedModel});
  };

  const getDynamicBuildTypeFields = () => {
    switch (model?.getData("buildType")) {
      case "gradle":
        return (
          <Col lg={6}>
            <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"gradleTask"}/>
          </Col>
        );
      case "maven":
        return (
          <Col lg={6}>
            <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"mavenTask"}/>
          </Col>
        );
    }
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
        <JenkinsJobsUnitTestingTypeSelectInput
          model={model}
          setModel={setModel}
          fieldName="buildType"
        />
      </Col>
      {getDynamicBuildTypeFields()}
      {getAutoScalingField()}
    </Row>
  );
}

JenkinsUnitTestingEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  autoScalingEnabled: PropTypes.bool
};

export default JenkinsUnitTestingEditorPanel;
