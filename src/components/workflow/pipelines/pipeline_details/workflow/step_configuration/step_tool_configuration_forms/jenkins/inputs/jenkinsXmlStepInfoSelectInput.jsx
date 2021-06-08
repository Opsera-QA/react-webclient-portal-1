import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JenkinsXmlStepInfoSelectInput({ dataObject, setDataObject, disabled, plan, stepId }) {
  const jobType = dataObject.getData("jobType");
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  const clearDataFunction = (fieldName) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("stepIdXML", "");
    setDataObject({ ...newDataObject });
  };
  if (jobType !== "SFDC PUSH ARTIFACTS") {
    return null;
  }
  return (
    <SelectInputBase
      fieldName={"stepIdXML"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={"Select Build-Xml Step Info"}
      selectOptions={listOfSteps}
      valueField="_id"
      textField="name"
      disabled={disabled}
      clearDataFunction={clearDataFunction}
    />
  );
}
JenkinsXmlStepInfoSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  listOfSteps: PropTypes.any,
  stepId: PropTypes.string,
  plan: PropTypes.object,
};
JenkinsXmlStepInfoSelectInput.defaultProps = {
  disabled: false,
};

export default JenkinsXmlStepInfoSelectInput;
