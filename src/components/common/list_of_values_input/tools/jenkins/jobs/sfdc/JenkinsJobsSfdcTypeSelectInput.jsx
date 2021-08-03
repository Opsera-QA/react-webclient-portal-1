import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JENKINS_JOBS_SFDC_OPTIONS = [
  {
    name: "SFDC Create XML Package",
    value: "SFDC CREATE PACKAGE XML",
  },
  {
    name: "Profile Migration",
    value: "SFDC PROFILE DEPLOY",
  },
  {
    name: "SFDC Validate XML Package",
    value: "SFDC VALIDATE PACKAGE XML",
  },
  {
    name: "SFDC Backup",
    value: "SFDC BACK UP",
  },
  {
    name: "SFDC Deploy",
    value: "SFDC DEPLOY",
  },
  {
    name: "SDFC Unit Test",
    value: "SFDC UNIT TESTING",
  },
  {
    name: "SDFC Push Artifacts",
    value: "SFDC PUSH ARTIFACTS",
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
