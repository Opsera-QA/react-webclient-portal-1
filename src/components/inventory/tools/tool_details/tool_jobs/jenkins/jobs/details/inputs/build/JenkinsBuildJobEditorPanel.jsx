import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsJobsBuildMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/build/jenkins-jobs-build-metadata";
import JenkinsJobsGenericAgentTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/JenkinsJobsGenericAgentTypeSelectInput";
import JenkinsJobsBuildTypeSelectInput
  from "components/common/list_of_values_input/tools/jenkins/jobs/build/JenkinsJobsBuildTypeSelectInput";
import JenkinsJobsPythonAgentLabelSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/JenkinsJobsPythonAgentLabelSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ScriptLibrarySelectInput from "components/common/list_of_values_input/inventory/scripts/ScriptLibrarySelectInput";
import PasswordInput from "components/common/inputs/text/PasswordInput";
import {
  jenkinsXcodeBuildJobMetadata
} from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/build/jenkinsXcodeBuildJob.metadata";

const getMetadataForBuildType = (buildType) => {
  switch (buildType) {
    case "xcode":
      return jenkinsXcodeBuildJobMetadata;
    default:
      return JenkinsJobsBuildMetadata;
  }
};

function JenkinsBuildJobEditorPanel(
  {
    jenkinsJobConfiguration,
    model,
    setModel,
    autoScalingEnabled,
    buildType,
  }) {
  useEffect(() => {
    const metadata = getMetadataForBuildType(buildType);
    const parsedModel = modelHelpers.parseObjectIntoModel(jenkinsJobConfiguration, metadata);
    parsedModel.setData("buildType", buildType);
    setModel({...parsedModel});
  }, [jenkinsJobConfiguration, buildType]);

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
          <>
            <Col lg={6}>
              <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"mavenTask"}/>
            </Col>
            <Col lg={12}>
              <BooleanToggleInput 
                dataObject={model}
                setDataObject={setModel}
                fieldName={"customMavenSettings"}
              />
            </Col>
            {model?.getData("customMavenSettings") === true && 
              <Col lg={12}>
                <ScriptLibrarySelectInput
                  fieldName={"scriptId"}
                  model={model}
                  setModel={setModel}
                />
              </Col>
            }            
          </>          
        );
      case "msbuild":
        return (
          <Col lg={6}>
            <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"commandLineArgs"}/>
          </Col>
        );
      case "xcode":
        return (
          <>
            <Col lg={12}>
              <ScriptLibrarySelectInput
                fieldName={"scriptId"}
                model={model}
                setModel={setModel}
              />
            </Col>            
            <Col lg={12}>
              <PasswordInput 
                dataObject={model} 
                setDataObject={setModel} 
                fieldName={"developerTeamId"}
              />
            </Col>
          </>          
        );        
    }
  };

  const getAutoScalingField = () => {
    if (model?.getData("buildType") === "xcode") {
      return null;
    }
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
  buildType: PropTypes.string,
};

export default JenkinsBuildJobEditorPanel;
