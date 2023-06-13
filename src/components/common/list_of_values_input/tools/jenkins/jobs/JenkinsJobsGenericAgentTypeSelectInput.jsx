import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const JENKINS_JOBS_GENERIC_AGENT_TYPES = [
  {
    "name": "Ubuntu Agent",
    "env": "linux",
    "value": "generic-linux",
  },
  {
    "name": "Windows Agent",
    "env": "windows",
    "value": "generic-windows",
  },
];

function JenkinsJobsGenericAgentTypeSelectInput({ fieldName, model, setModel, setDataFunction, agentList, jenkinsJobType }) {

  const getJenkinsJobAgentTypes = () => {

    const JENKINS_JOBS_WINDOWS_AGENT_TYPE = [
      {
        "name": "Windows Agent",
        "env": "windows",
        "value": "generic-windows",
      },
    ];
    const JENKINS_JOBS_UBUNTU_AGENT_TYPE = [
      {
        "name": "Ubuntu Agent",
        "env": "linux",
        "value": "generic-linux",
      },
    ];

    if (jenkinsJobType === "BUILD") {
      switch (model?.getData("buildType")) {
        case "dotnet":
          return JENKINS_JOBS_WINDOWS_AGENT_TYPE;
        case "gradle":
        case "maven":
        case "docker":
        case "node":
          return JENKINS_JOBS_UBUNTU_AGENT_TYPE;
        case "msbuild":
          return [];
        default:
          return JENKINS_JOBS_GENERIC_AGENT_TYPES;
      }
    }

    switch (jenkinsJobType) {
      case "SFDC":
      case "PMD_SCAN":
      case "SFDC_CODE_SCAN":
      case "CODE SCAN":
      case "UNIT TESTING":
      case "FUNCTIONAL TESTING":
      case "PERFORMANCE TESTING":
      case "CYPRESS UNIT TESTING":
      case "NUNIT_UNIT_TESTING":
      case "DOCKER PUSH":
      case "ARTIFACTORY_DOCKER_PUSH":
      case "SFDC PUSH ARTIFACTS":
      case "POWERSHELL SCRIPT":
      case "AZURE_DOCKER_PUSH":
        return JENKINS_JOBS_UBUNTU_AGENT_TYPE;
      case "COVERITY":
        return JENKINS_JOBS_GENERIC_AGENT_TYPES;
    }
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={agentList ? agentList : getJenkinsJobAgentTypes()}
      valueField="value"
      textField="name"
    />
  );
}

JenkinsJobsGenericAgentTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  agentList: PropTypes.array,
  jenkinsJobType: PropTypes.string
};

JenkinsJobsGenericAgentTypeSelectInput.defaultProps = {
  fieldName: "agentLabels",
};

export default JenkinsJobsGenericAgentTypeSelectInput;
