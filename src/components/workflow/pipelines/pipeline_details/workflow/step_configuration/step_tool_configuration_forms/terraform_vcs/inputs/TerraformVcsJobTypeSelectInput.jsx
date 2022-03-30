import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function TerraformVcsJobTypeSelectInput({dataObject, setDataObject, disabled}) {

  const JOB_TYPES = [
    {
      name: "Execute",
      value: "EXECUTE",
    },    
    {
      name: "Delete",
      value: "DELETE",
    }
  ];

  return (
    
     <SelectInputBase
       fieldName={"toolActionType"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={JOB_TYPES}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Job Type"}
       disabled={disabled}
       busy={disabled}
     />
  );
}

TerraformVcsJobTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformVcsJobTypeSelectInput;