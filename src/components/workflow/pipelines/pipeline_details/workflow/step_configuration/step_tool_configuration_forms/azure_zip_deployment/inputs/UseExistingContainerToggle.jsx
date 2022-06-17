import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function UseExistingContainerToggle({dataObject, setDataObject, disabled}) {

    const setDataFunction = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        let sourceScriptFlag = !dataObject.getData(fieldName);
        newDataObject.setData(fieldName, sourceScriptFlag);
        newDataObject.setData("containerName", "");
        setDataObject({...newDataObject});
    };

    return (
        <BooleanToggleInput
            fieldName={"existingContainer"}
            setDataFunction={setDataFunction}
            dataObject={dataObject}
            setDataObject={setDataObject}
            disabled={disabled}
        />
    );
}

UseExistingContainerToggle.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default UseExistingContainerToggle;