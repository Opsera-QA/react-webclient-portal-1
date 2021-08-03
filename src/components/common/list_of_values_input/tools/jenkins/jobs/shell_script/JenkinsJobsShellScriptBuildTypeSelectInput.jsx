import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JENKINS_JOBS_SHELL_SCRIPT_OPTION = [
  {
    name: "Python",
    value: "python",
  },
  {
    name: "Others",
    value: "others",
  },
];

function JenkinsJobsShellScriptBuildTypeSelectInput({ fieldName, model, setModel, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={JENKINS_JOBS_SHELL_SCRIPT_OPTION}
      valueField="value"
      textField="name"
    />
  );
}

JenkinsJobsShellScriptBuildTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default JenkinsJobsShellScriptBuildTypeSelectInput;
