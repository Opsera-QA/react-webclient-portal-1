import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import JenkinsJobTypes from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/jenkinsJobTypes.constants";

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

    if (jenkinsJobType === JenkinsJobTypes.BUILD) {
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
      case JenkinsJobTypes.SFDC:
      case JenkinsJobTypes.PMD_SCAN:
      case JenkinsJobTypes.SFDC_CODE_SCAN:
      case JenkinsJobTypes.CODE_SCAN:
      case JenkinsJobTypes.UNIT_TESTING:
      case JenkinsJobTypes.FUNCTIONAL_TESTING:
      case JenkinsJobTypes.PERFORMANCE_TESTING:
      case JenkinsJobTypes.CYPRESS_UNIT_TESTING:
      case JenkinsJobTypes.NUNIT_UNIT_TESTING:
      case JenkinsJobTypes.DOCKER_PUSH:
      case JenkinsJobTypes.ARTIFACTORY_DOCKER_PUSH:
      case JenkinsJobTypes.SFDC_PUSH_ARTIFACTS:
      case JenkinsJobTypes.POWERSHELL_SCRIPT:
      case JenkinsJobTypes.AZURE_DOCKER_PUSH:
        return JENKINS_JOBS_UBUNTU_AGENT_TYPE;
      case JenkinsJobTypes.COVERITY:
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
