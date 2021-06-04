import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const ACCESS_OPTIONS = [
    { value: "", label: "Select One", isDisabled: "yes" },
    { value: "private", label: "Private" },
    { value: "public", label: "Public" },
  ];

function EBSAccessOptionsInput({dataObject, setDataObject, disabled}) {
    return (
        <SelectInputBase
            setDataObject={setDataObject}
            valueField="value"
            textField="label"
            dataObject={dataObject}
            filter={"contains"}
            selectOptions={ACCESS_OPTIONS}
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

