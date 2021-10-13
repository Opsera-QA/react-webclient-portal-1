import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function SalesforceOrganizationSyncSalesforceToolSelectInput({dataObject, setDataObject, disabled}) {

  const setSfdcTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcToolId", selectedOption.id);
    newDataObject.setData("accountUsername",selectedOption.configuration.accountUsername);
    newDataObject.setData("sfdcToolName", selectedOption.name);
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
       setDataFunction={setSfdcTool}
       disabled={disabled}
     />
  );
}

SalesforceOrganizationSyncSalesforceToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncSalesforceToolSelectInput;
