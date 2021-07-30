import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const JENKINS_JOBS_PYTHON_AGENT_LABELS = [
  {
    name: "Python 2",
    env: "python",
    value: "python2-alpine",
  },
  {
    name: "Python 3",
    env: "python",
    value: "python3-alpine",
  },
];

function JenkinsJobsPythonAgentLabelSelectInput({ fieldName, model, setModel, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={JENKINS_JOBS_PYTHON_AGENT_LABELS}
      valueField="value"
      textField="name"
    />
  );
}

JenkinsJobsPythonAgentLabelSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
};

JenkinsJobsPythonAgentLabelSelectInput.defaultProps = {
  fieldName: "agentLabels",
};

export default JenkinsJobsPythonAgentLabelSelectInput;
