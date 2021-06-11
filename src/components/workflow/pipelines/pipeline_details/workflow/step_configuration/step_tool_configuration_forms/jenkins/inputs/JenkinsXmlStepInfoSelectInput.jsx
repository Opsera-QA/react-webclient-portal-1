import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JenkinsXmlStepInfoSelectInput({ dataObject, fieldName, setDataObject, disabled, plan, stepId }) {
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(0, plan.findIndex((element) => element._id === stepId));
  };

  if (dataObject == null || dataObject.getData("jobType") !== "SFDC PUSH ARTIFACTS") {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={"Select Build-Xml Step Info"}
      selectOptions={listOfSteps}
      valueField="_id"
      textField="name"
      disabled={disabled}
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
  fieldName: PropTypes.string
};

JenkinsXmlStepInfoSelectInput.defaultProps = {
  fieldName: "stepIdXML",
};

export default JenkinsXmlStepInfoSelectInput;
