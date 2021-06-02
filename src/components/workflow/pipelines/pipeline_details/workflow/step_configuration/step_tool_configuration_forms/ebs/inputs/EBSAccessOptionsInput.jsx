import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const ACCESS_OPTIONS = [
    { value: "", label: "Select One", isDisabled: "yes" },
    { value: "private", label: "Private" },
    { value: "public", label: "Public" },
  ];

function EBSAccessOptionsInput({dataObject, setDataObject, disabled}) {
    const setAccess = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        newDataObject.setData("bucketAccess", selectedOption.value);
        setDataObject({...newDataObject});
      };
    const clearDataFunction = () => {
        let newDataObject = {...dataObject};
        newDataObject.setData("bucketAccess", "");
        setDataObject({...newDataObject});
      };
    return (
        <SelectInputBase
            setDataFunction={setAccess}
            setDataObject={setDataObject}
            valueField="value"
            textField="label"
            dataObject={dataObject}
            filter={"contains"}
            clearDataFunction={clearDataFunction}
            selectOptions={ACCESS_OPTIONS ? ACCESS_OPTIONS : []}
            fieldName={"bucketAccess"}
            disabled={disabled}
        />     
    );
}

EBSAccessOptionsInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default EBSAccessOptionsInput;

