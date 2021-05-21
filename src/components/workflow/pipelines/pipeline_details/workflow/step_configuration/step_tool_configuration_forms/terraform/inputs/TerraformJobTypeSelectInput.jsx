import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function TerraformJobTypeSelectInput({dataObject, setDataObject, disabled}) {
  
  const handleDTOChange = async (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    await newDataObject.setData(fieldName, selectedOption.value);
    setDataObject({...newDataObject});
  };

  const JOB_TYPES = [
    {
      name: "Execute Script",
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
       setDataFunction={handleDTOChange}
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