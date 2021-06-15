import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const TERRAFORM_JOB_TYPES = [
  {
    name: "Execute Script",
    value: "EXECUTE",
  },
  {
    name: "Delete",
    value: "DELETE",
  }
];

function TerraformJobTypeSelectInput({dataObject, setDataObject, disabled}) {

  return (
     <SelectInputBase
       fieldName={"toolActionType"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={TERRAFORM_JOB_TYPES}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Job Type"}
       disabled={disabled}
       busy={disabled}
     />
  );
}

TerraformJobTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformJobTypeSelectInput;