import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function DestSfdcToolInput({dataObject, setDataObject, disabled}) {
  const setDestSfdcTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcDestToolId", selectedOption.id);
    newDataObject.setData("destAccountUsername",selectedOption.configuration.accountUsername);
    newDataObject.setData("sfdcDestToolName", selectedOption.name);
    setDataObject({...newDataObject});
  };

  const clearToolData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("sfdcDestToolName", "");
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
       setDataFunction={setDestSfdcTool}
       disabled={disabled}
       clearDataFunction={clearToolData}
     />
  );
}

DestSfdcToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DestSfdcToolInput;
