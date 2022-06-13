import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JENKINS_JOBS_SFDC_OPTIONS = [
  {
    name: "Salesforce Create XML Package",
    value: "SFDC CREATE PACKAGE XML",
  },
  {
    name: "Salesforce Migration Job",
    value: "SFDC PROFILE DEPLOY",
  },
  {
    name: "Salesforce Validate XML Package",
    value: "SFDC VALIDATE PACKAGE XML",
  },
  {
    name: "Salesforce Backup",
    value: "SFDC BACK UP",
  },
  {
    name: "Salesforce Deploy",
    value: "SFDC DEPLOY",
  },
  {
    name: "Salesforce Unit Test",
    value: "SFDC UNIT TESTING",
  },
  {
    name: "Salesforce Push Artifacts",
    value: "SFDC PUSH ARTIFACTS",
  },
  {
    name: "Salesforce Data Transformer",
    value: "SFDC DATA TRANSFORMER",
  },
];

function JenkinsJobsSfdcTypeSelectInput({ fieldName, model, setModel }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={JENKINS_JOBS_SFDC_OPTIONS}
      valueField="value"
      textField="name"
      disabled={false}
    />
  );
}

JenkinsJobsSfdcTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default JenkinsJobsSfdcTypeSelectInput;
