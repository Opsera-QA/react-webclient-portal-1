import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JENKINS_JOBS_UNIT_TEST_OPTIONS = [
  {
    name: "Gradle",
    value: "gradle",
  },
  {
    name: "Maven",
    value: "maven",
  },
];

function JenkinsJobsUnitTestingTypeSelectInput({ fieldName, model, setModel }) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = model;
    newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("buildTool", selectedOption.value);
    setModel({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={JENKINS_JOBS_UNIT_TEST_OPTIONS}
      valueField="value"
      textField="name"
      disabled={false}
    />
  );
}

JenkinsJobsUnitTestingTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default JenkinsJobsUnitTestingTypeSelectInput;
