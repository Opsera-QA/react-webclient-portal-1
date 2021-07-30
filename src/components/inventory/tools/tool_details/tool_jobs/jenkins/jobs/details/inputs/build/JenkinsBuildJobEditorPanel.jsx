import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsJobsBuildMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/build/jenkins-jobs-build-metadata";
import JenkinsJobsPythonAgentLabelSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/python/JenkinsJobsPythonAgentLabelSelectInput";
import JenkinsJobsGenericAgentTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/JenkinsJobsGenericAgentTypeSelectInput";
import JenkinsJobsBuildTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/build/JenkinsJobsBuildTypeSelectInput";

function JenkinsBuildJobEditorPanel({ jenkinsJobConfiguration, model, setModel, autoScalingEnabled }) {
  useEffect(() => {
    unpackJobConfiguration();
  }, [jenkinsJobConfiguration]);

  const unpackJobConfiguration = () => {
    const parsedModel = modelHelpers.parseObjectIntoModelBase(jenkinsJobConfiguration, JenkinsJobsBuildMetadata);
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
      case "msbuild":
        return (
          <Col lg={6}>
            <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"commandLineArgs"}/>
          </Col>
        );
    }
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
        <JenkinsJobsBuildTypeSelectInput
          model={model}
          setModel={setModel}
          fieldName={"buildType"}
        />
      </Col>
      {getDynamicBuildTypeFields()}
      {getAutoScalingField()}
    </Row>
  );
}

JenkinsBuildJobEditorPanel.propTypes = {
  jenkinsJobConfiguration: PropTypes.object,
  model: PropTypes.object,
  setModel: PropTypes.func,
  autoScalingEnabled: PropTypes.bool,
};

export default JenkinsBuildJobEditorPanel;
