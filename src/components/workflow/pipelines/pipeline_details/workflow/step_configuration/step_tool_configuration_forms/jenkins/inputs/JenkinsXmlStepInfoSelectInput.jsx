import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Rework
function JenkinsXmlStepInfoSelectInput({ dataObject, fieldName, setDataObject, disabled, plan, stepId, jobType }) {
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(0, plan.findIndex((element) => element._id === stepId));
  };

  if (dataObject == null || (jobType !== "SFDC PUSH ARTIFACTS" && jobType !== "SFDC DATA TRANSFORM")) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={"Select Build-XML Step Info"}
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
  plan: PropTypes.any,
  fieldName: PropTypes.string,
  jobType: PropTypes.string,
};

JenkinsXmlStepInfoSelectInput.defaultProps = {
  fieldName: "stepIdXML",
};

export default JenkinsXmlStepInfoSelectInput;
