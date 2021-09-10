import React from "react";
import PropTypes from "prop-types";
import PipelineSFDXToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineSFDXToolInput";

function SFDXToolInput({dataObject, setDataObject, disabled}) {
  const setSFDCTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcToolId", selectedOption.id);
    newDataObject.setData("accountUsername",selectedOption.configuration.accountUsername);
    newDataObject.setData("sfdcToolName", selectedOption.name);
    setDataObject({...newDataObject});
  };

  return (
     <PipelineSFDXToolInput
       toolType={"sfdc-configurator"}
       toolFriendlyName={"SFDC"}
       fieldName={"sfdcToolName"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setSFDCTool}
       disabled={disabled}
     />
  );
}

SFDXToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SFDXToolInput;