import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Should we move these to a cypress.job.types.js helper file?
export const CYPRESS_JOB_TYPES = {
  OPSERA_MANAGED_JOB: "opsera-job",
  CUSTOM_JOB: "job",
};

export const CYPRESS_JOB_OPTIONS = [
  { value: CYPRESS_JOB_TYPES.CUSTOM_JOB, label: "Custom Job" },
  { value: CYPRESS_JOB_TYPES.OPSERA_MANAGED_JOB, label: "Opsera Managed Job" },
];

function CypressStepJobTypeSelectInput({ model, setModel }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption?.value);
    newDataObject.setData("jobName", "");
    newDataObject.setData("buildType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("toolJobType", "");
    setModel({...newDataObject});
  };
  
  return (
    <SelectInputBase
      fieldName={"opsera_job_type"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      placeholderText={"Select Job Type"}
      selectOptions={CYPRESS_JOB_OPTIONS}
      valueField={"value"}
      textField={"label"}
    />
  );
}

CypressStepJobTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default CypressStepJobTypeSelectInput;
