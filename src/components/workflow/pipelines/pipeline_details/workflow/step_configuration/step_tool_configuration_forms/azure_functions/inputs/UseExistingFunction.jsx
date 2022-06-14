import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function UseExistingFunction({dataObject, setDataObject, disabled}) {

    const setDataFunction = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        let sourceScriptFlag = !dataObject.getData(fieldName);
        newDataObject.setData(fieldName, sourceScriptFlag);
        newDataObject.setData("azureFunctionName", "");
        newDataObject.setData("resourceGroupName", "");
        newDataObject.setData("useCustomResourceGroup", "");
        newDataObject.setData("applicationType", "");
        setDataObject({...newDataObject});
    };

    return (
        <BooleanToggleInput
            fieldName={"existingFunctionName"}
            setDataFunction={setDataFunction}
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={disabled}
        />
    );
}

UseExistingFunction.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default UseExistingFunction;