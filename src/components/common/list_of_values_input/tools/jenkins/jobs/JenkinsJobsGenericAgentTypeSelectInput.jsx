import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const JENKINS_JOBS_GENERIC_AGENT_TYPES = [
  {
    "name": "Ubuntu Agent",
    "env" : "linux",
    "value": "generic-linux",
  },
  {
    "name": "Windows Agent",
    "env" : "windows",
    "value": "generic-windows",
  },
  {
    "name": "CentOS Agent",
    "env" : "linux",
    "value": "generic-centos",
  }
];

function JenkinsJobsGenericAgentTypeSelectInput({ fieldName, model, setModel, setDataFunction, agentList }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={agentList ? agentList :JENKINS_JOBS_GENERIC_AGENT_TYPES}
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
};

JenkinsJobsGenericAgentTypeSelectInput.defaultProps = {
  fieldName: "agentLabels",
};

export default JenkinsJobsGenericAgentTypeSelectInput;
