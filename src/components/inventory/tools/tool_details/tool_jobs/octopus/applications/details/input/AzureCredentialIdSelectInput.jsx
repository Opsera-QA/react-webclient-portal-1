import React, { useContext, useEffect, useState } from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";

function AzureCredentialIdSelectInput({ fieldName, dataObject, setDataObject , azureConfig, setApplicationData }) {
  const [applicationsList, setApplicationsList] = useState([]);

  useEffect(()=>{
    if(azureConfig && azureConfig.applications && azureConfig.applications.length >0) {
      setApplicationsList(azureConfig.applications);
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
