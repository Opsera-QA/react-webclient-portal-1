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
    label: "PMD Scan",
    value: "PMD_SCAN"
  }, 
  {
    label: "Salesforce Code Analyzer",
    value: "SFDC_CODE_SCAN"
  },
  {
    label: "Code Scan",
    value: "CODE SCAN"
  },
  {
    label: "Coverity Scan",
    value: "COVERITY"
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

// TODO: Rewrite Syntax to follow tasks.types.js
export const getJenkinsJobTypeLabelForValue = (jenkinsJobType) => {
  if (Array.isArray(jenkinsJobType) && jenkinsJobType.length > 0) {
    const objectProperty = jenkinsJobType[0];
    const found = JENKINS_JOB_TYPES.find((jobType) => {return jobType.value === objectProperty;});

    if (found != null) {
      return found?.label;
    }
  }
  else if (typeof jenkinsJobType === "string") {
    const found = JENKINS_JOB_TYPES.find((jobType) => {return jobType.value === jenkinsJobType;});

    if (found != null) {
      return found?.label;
    }
  }

  return "Unknown Job Type";
};

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