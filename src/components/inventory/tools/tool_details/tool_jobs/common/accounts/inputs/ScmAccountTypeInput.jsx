import React, {useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import scmCreateAccountMetadata from "../scm-create-account-metadata";

function ScmAccountTypeInput({dataObject, setDataObject, disabled}) {
    
    const [isLoading, setIsLoading] = useState(false);

    const setAccountType = (fieldName, selectedOption) => {   
        let newDataObject = {...dataObject};        
        newDataObject.setData("accountType", selectedOption.value);        
        setDataObject({...newDataObject});
    };

    const clearAccountType = (fieldName, selectedOption) => {   
        let newDataObject = {...dataObject};    
        newDataObject.setData("accountType", "");        
        setDataObject({...newDataObject});
    };    

    return (        
    <SelectInputBase
        fieldName={"accountType"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setAccountType}
        selectOptions={scmCreateAccountMetadata.scmAccountTypeArray}
        busy={isLoading}        
        valueField="value"
        textField="name"
        clearDataFunction={clearAccountType}        
        disabled={disabled || isLoading}
    />    
    );
}

ScmAccountTypeInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default ScmAccountTypeInput;