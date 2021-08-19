import React, { useContext, useEffect, useState } from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";

function AzureAcrPushCredentialIdSelectInput({ fieldName, dataObject, setDataObject , azureConfig, setApplicationData }) {
  const [applicationsList, setApplicationsList] = useState([]);

  useEffect(()=>{
    if(azureConfig && azureConfig.applications && azureConfig.applications.length >0) {
      if(!dataObject.isNew() && dataObject.getData(fieldName)!==""){
        const selectedApplication = azureConfig.applications.find(el=>el._id=== dataObject.getData(fieldName));
        let newDataObject = {...dataObject};
        newDataObject.setData(fieldName, selectedApplication._id);
        setApplicationData(selectedApplication?.configuration);  
        setDataObject({...newDataObject});
      }
      setApplicationsList(azureConfig.applications);
    } else {
      setApplicationsList([]);
    }
  },[azureConfig]);

  const handleChange = (fieldName, selectedOption) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setData('acrLoginUrl', "");
    newDataObject.setData('azureRegistryName', "");
    newDataObject.setData('newRepo',"");
    newDataObject.setData('azureRepoName',"");
    setApplicationData(selectedOption?.configuration);  
    setDataObject({...newDataObject});
  };

  const clearDataFunction=()=>{
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, "");
    newDataObject.setData('acrLoginUrl', "");
    newDataObject.setData('azureRegistryName', "");
    newDataObject.setData('newRepo',"");
    newDataObject.setData('azureRepoName',"");
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
        placeholder={'Select an application'}
      />
  );
}

AzureAcrPushCredentialIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureConfig:PropTypes.object,
  setApplicationData: PropTypes.func,
  
};

AzureAcrPushCredentialIdSelectInput.defaultProps = {
  fieldName: "azureCredentialId",
};

export default AzureAcrPushCredentialIdSelectInput;
