import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function SFDCToolInput({dataObject, setDataObject, disabled}) {

  const setSFDCTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcToolId", selectedOption.id);
    newDataObject.setData("accountUsername",selectedOption.configuration.accountUsername);
    newDataObject.setData("sfdcToolName", selectedOption.name);
    setDataObject({...newDataObject});
  };

  const clearToolData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcToolId", "");
    newDataObject.setData("accountUsername", "");
    newDataObject.setData("sfdcToolName", "");
    setDataObject({...newDataObject});
  };

  return (
     <PipelineToolInput
       toolType={"sfdc-configurator"}
       toolFriendlyName={"SFDC"}
       fieldName={"sfdcToolName"}
       configurationRequired={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setSFDCTool}
       disabled={disabled}
       clearDataFunction={clearToolData}
     />
  );
}

SFDCToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SFDCToolInput;
