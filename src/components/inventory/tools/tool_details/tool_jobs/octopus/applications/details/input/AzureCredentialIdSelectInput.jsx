import React, { useContext, useEffect, useState } from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";

function AzureCredentialIdSelectInput({ fieldName, dataObject, setDataObject , azureConfig, setApplicationData }) {
  const [applicationsList, setApplicationsList] = useState([]);

  useEffect(()=>{
    if(azureConfig && azureConfig.applications && azureConfig.applications.length >0) {
      setApplicationsList(azureConfig.applications);
    }

    if (dataObject?.getData("azureCredentialId").length > 0) {
      if (applicationsList && applicationsList.length > 0) {
        let credential = applicationsList.find(el => el._id === dataObject?.getData("azureCredentialId"));
        if (credential && Object.keys(credential).length > 0) {
          setApplicationData(credential?.configuration);
        }
      }
    }

  },[azureConfig]);

  const handleChange = (fieldName, selectedOption) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption._id);
    setApplicationData(selectedOption?.configuration);  
    setDataObject({...newDataObject});
  };

  const clearDataFunction=()=>{
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("clusterName", "");
    newDataObject.setData("resourceGroupName", "");
    setApplicationData(null);  
    setDataObject({...newDataObject});
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={handleChange}
        selectOptions={applicationsList}
        clearDataFunction={clearDataFunction}
        valueField={"_id"}
        textField={'name'}
        disabled={applicationsList.length === 0}
        placeholder={'Select azure credentials'}
      />
  );
}

AzureCredentialIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureConfig:PropTypes.object,
  setApplicationData: PropTypes.func,
  
};

AzureCredentialIdSelectInput.defaultProps = {
  fieldName: "azureCredentialId",
};

export default AzureCredentialIdSelectInput;
