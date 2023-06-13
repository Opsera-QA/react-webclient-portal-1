import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import JenkinsBuildJobEditorPanel, {getMetadataForJenkinsJobBuildType} from "./inputs/build/JenkinsBuildJobEditorPanel";
import JenkinsSfdcJobEditorPanel from "./inputs/sfdc/JenkinsSfdcJobEditorPanel";
import JenkinsUnitTestingEditorPanel from "./inputs/unit_testing/JenkinsUnitTestingEditorPanel";
import JenkinsShellScriptEditorPanel from "./inputs/shell_script/JenkinsShellScriptEditorPanel";
import JenkinsDockerPushEditorPanel from "./inputs/docker_push/JenkinsDockerPushEditorPanel";
import JenkinsSfdcJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/sfdc/jenkins-sfdc-build-metadata";
import JenkinsUnitTestJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/unit_testing/jenkins-unit-test-metadata";
import JenkinsDockerPushJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/docker_push/jenkins-docker-push-metadata";
import axios from "axios";
import JenkinsShellScriptJobMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/shell_script/jenkins-shell-script-metadata";
import JenkinsGenericJobEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/generic/JenkinsPythonJobEditorPanel";
import AzureDockerPushJobEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/inputs/azure_docker_push/AzureDockerPushJobEditorPanel";

export const getJenkinsJobConfigurationMetadata = (jenkinsJobType, buildType) => {
  switch (jenkinsJobType) {
    case "SFDC":
      return JenkinsSfdcJobMetadata;
    case "UNIT TESTING":
    case "FUNCTIONAL TESTING":
      return JenkinsUnitTestJobMetadata;
    case "DOCKER PUSH":
    case "ARTIFACTORY_DOCKER_PUSH":
      return JenkinsDockerPushJobMetadata;
    case "SHELL SCRIPT":
      return JenkinsShellScriptJobMetadata;
    case "BUILD":
    default:
      return getMetadataForJenkinsJobBuildType(buildType);
  }
};

function JenkinsJobSubEditorPanel({ jenkinsJobConfigurationModel, setJenkinsJobConfigurationModel, jenkinsJobType, jenkinsJobConfiguration, autoScalingEnabled }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jenkinsJobType]);

  const getSubEditorPanel = () => {
    switch (jenkinsJobType) {
      case "BUILD":
        return (
          <JenkinsBuildJobEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            autoScalingEnabled={autoScalingEnabled}
            buildType={jenkinsJobConfigurationModel?.getData("buildType")}
            jenkinsJobType={jenkinsJobType}
          />
        );
      case "SFDC":
        return (
          <JenkinsSfdcJobEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            autoScalingEnabled={autoScalingEnabled}
            jenkinsJobType={jenkinsJobType}
          />
        );
      case "UNIT TESTING":
      case "FUNCTIONAL TESTING":
        return (
          <JenkinsUnitTestingEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            autoScalingEnabled={autoScalingEnabled}
            jenkinsJobType={jenkinsJobType}
          />
        );
      case "SHELL SCRIPT":
        return (
          <JenkinsShellScriptEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            autoScalingEnabled={autoScalingEnabled}
            jenkinsJobType={jenkinsJobType}
          />
        );
      case "DOCKER PUSH":
        return (
          <JenkinsDockerPushEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            type="DOCKER PUSH"
            autoScalingEnabled={autoScalingEnabled}
            jenkinsJobType={jenkinsJobType}
          />
        );
      case "ARTIFACTORY_DOCKER_PUSH":
        return (
          <JenkinsDockerPushEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            autoScalingEnabled={autoScalingEnabled}
            type="ARTIFACTORY_DOCKER_PUSH"
            jenkinsJobType={jenkinsJobType}
          />
        );
      case "AZURE_DOCKER_PUSH":
        return (
          <AzureDockerPushJobEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            autoScalingEnabled={autoScalingEnabled}            
            jenkinsJobType={jenkinsJobType}
          />
        );
      default:
        return (
          <JenkinsGenericJobEditorPanel
            model={jenkinsJobConfigurationModel}
            setModel={setJenkinsJobConfigurationModel}
            jenkinsJobConfiguration={jenkinsJobConfiguration}
            autoScalingEnabled={autoScalingEnabled}
            jenkinsJobType={jenkinsJobType}
          />
        );
    }
  };

  return (
    <div>
      {getSubEditorPanel()}
    </div>
  );
}
JenkinsJobSubEditorPanel.propTypes = {
  jenkinsJobConfigurationModel: PropTypes.object,
  setJenkinsJobConfigurationModel: PropTypes.func,
  jenkinsJobConfiguration: PropTypes.object,
  jenkinsJobType: PropTypes.string,
  autoScalingEnabled: PropTypes.bool
};

export default JenkinsJobSubEditorPanel;
