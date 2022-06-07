import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ProvarLicenseTypeSelectInput({dataObject, setDataObject, isLoading, disabled}) {

    const LICENSE_LIST = [
        {
            name: "Trial",
            value: "Trial",
        },
        {
            name: "FixedSeat",
            value: "FixedSeat",
        },
        {
            name: "Floating",
            value: "Floating",
        }
    ];

    return (

        <SelectInputBase
            fieldName={"licenseType"}
            dataObject={dataObject}
            setDataObject={setDataObject}
            selectOptions={LICENSE_LIST}
            valueField={"value"}
            textField={"name"}
            placeholderText={"Select License Type"}
            disabled={disabled}
            busy={isLoading}
        />
    );
}

ProvarLicenseTypeSelectInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string
};

export default ProvarLicenseTypeSelectInput;