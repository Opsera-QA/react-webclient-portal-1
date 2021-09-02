import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const pythonAgentLabelOptions = [
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
const agentLabelOptions = [
  {
    name: "Ubuntu Agent",
    env: "linux",
    value: "generic-linux",
  },
];

function JenkinsJobsCommonAgentLabelsSelectInput({ fieldName, dataObject, setDataObject }) {
  let options = agentLabelOptions;
  if (dataObject.getData("buildType") === "python") {
    options = pythonAgentLabelOptions;
  }
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={options}
      valueField="value"
      textField="name"
      disabled={false}
    />
  );
}

JenkinsJobsCommonAgentLabelsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsJobsCommonAgentLabelsSelectInput;
