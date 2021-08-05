import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JENKINS_JOB_TYPES = [
  {
    label: "Build",
    value: "BUILD"
  },
  {
    label: "SFDC Jobs",
    value: "SFDC"
  },
  {
    label: "Code Scan",
    value: "CODE SCAN"
  },
  {
    label: "Unit Test",
    value: "UNIT TESTING"
  },
  {
    label: "Functional Test",
    value: "FUNCTIONAL TESTING"
  },
  {
    label: "Performance Test",
    value: "PERFORMANCE TESTING"
  },
  {
    label: "Shell Script",
    value: "SHELL SCRIPT"
  },
  {
    label: "Cypress Unit Test",
    value: "CYPRESS UNIT TESTING"
  },
  {
    label: "NUnit Unit Test",
    value: "NUNIT_UNIT_TESTING"
  },
  {
    label: "Docker Push",
    value: "DOCKER PUSH"
  },
  {
    label: "Artifactory Docker Push",
    value: "ARTIFACTORY_DOCKER_PUSH"
  },
  {
    label: "Push to Git",
    value: "SFDC PUSH ARTIFACTS"
  },
  {
    label: "Powershell Script",
    value: "POWERSHELL SCRIPT"
  },
  {
    label: "Azure Docker Push",
    value: "AZURE_DOCKER_PUSH"
  },
];

function JenkinsJobTypeSelectInput({ fieldName, model, setModel, setConfigurationModel, disabled }) {
  const setDataFunction = (fieldName, valueObject) => {
    const value = valueObject?.value;
    model.setData("type", [value]);
    setConfigurationModel(undefined);
    model.setData("configuration", {});
    setModel({...model});
  };

  const getCurrentValue = () => {
    const typeArray = model?.getArrayData("type");
    return Array.isArray(typeArray) && typeArray.length > 0 ? typeArray[0] : "";
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={JENKINS_JOB_TYPES}
      getCurrentValue={getCurrentValue}
      valueField="value"
      textField="label"
      disabled={disabled}
    />
  );
}

JenkinsJobTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setConfigurationModel: PropTypes.func
};

JenkinsJobTypeSelectInput.defaultProps = {
  fieldName: "jobType",
};

export default JenkinsJobTypeSelectInput;