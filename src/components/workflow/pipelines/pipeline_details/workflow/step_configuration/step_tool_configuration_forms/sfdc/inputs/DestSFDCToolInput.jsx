import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function DestSFDCToolInput({dataObject, setDataObject, disabled}) {
  const setDestSFDCTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcDestToolId", selectedOption.id);
    newDataObject.setData("destAccountUsername",selectedOption.configuration.accountUsername);
    newDataObject.setData("sfdcDestToolName", selectedOption.name);
    setDataObject({...newDataObject});
  };

  return (
     <PipelineToolInput
       toolType={"sfdc-configurator"}
       toolFriendlyName={"SFDC"}
       fieldName={"sfdcDestToolName"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setDestSFDCTool}
       disabled={disabled}
     />
  );
}

DestSFDCToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DestSFDCToolInput;
