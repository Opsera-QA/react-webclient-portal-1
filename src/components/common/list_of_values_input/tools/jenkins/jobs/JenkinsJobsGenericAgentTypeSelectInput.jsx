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
  }
];

function JenkinsJobsGenericAgentTypeSelectInput({ fieldName, model, setModel, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={JENKINS_JOBS_GENERIC_AGENT_TYPES}
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
};

JenkinsJobsGenericAgentTypeSelectInput.defaultProps = {
  fieldName: "agentLabels",
};

export default JenkinsJobsGenericAgentTypeSelectInput;
