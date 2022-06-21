import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function BoomiJobTypeSelectInput({dataObject, setDataObject, isLoading, disabled}) {

    const ACTION_LIST = [
        {
            name: "Create Package Component",
            value: "CREATE_PACKAGE_COMPONENT",
        }
    ];

    const setDataFunction = async (fieldName, value) => {
        let newDataObject = dataObject;
        newDataObject.setData("jobType", value.value);
        setDataObject({ ...newDataObject });
    };

    return (

        <SelectInputBase
            fieldName={"jobType"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            setDataFunction={setDataFunction}
            selectOptions={ACTION_LIST}
            valueField={"value"}
            textField={"name"}
            placeholderText={"Select Job Type"}
            disabled={disabled}
            busy={isLoading}
        />
    );
}

BoomiJobTypeSelectInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string
};

export default BoomiJobTypeSelectInput;