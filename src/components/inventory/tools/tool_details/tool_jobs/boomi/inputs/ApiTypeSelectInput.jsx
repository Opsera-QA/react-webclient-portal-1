import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ApiTypeTypeSelectInput({dataObject, setDataObject, isLoading, disabled}) {

    const API_TYPE_LIST = [
        {
            name: "Custom",
            value: "custom",
        },
        {
            name: "Native",
            value: "native",
        },
    ];

    return (

        <SelectInputBase
            fieldName={"apiType"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            selectOptions={API_TYPE_LIST}
            valueField={"value"}
            textField={"name"}
            placeholderText={"Select API Type"}
            disabled={disabled}
            busy={isLoading}
        />
    );
}

ApiTypeTypeSelectInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string
};

export default ApiTypeTypeSelectInput;