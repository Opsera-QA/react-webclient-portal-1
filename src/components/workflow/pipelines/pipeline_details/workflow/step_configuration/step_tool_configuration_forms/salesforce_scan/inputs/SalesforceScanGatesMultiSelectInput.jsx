import React from "react";
import PropTypes from "prop-types";
import SfdxQualityGatesMultiSelectInput
    from "../../../../../../../../common/list_of_values_input/tools/sfdx_scan/SfdxQualityGatesMultiSelectInput";

function SalesforceScanGatesMultiSelectInput({dataObject, setDataObject, disabled}) {
    return (
        <SfdxQualityGatesMultiSelectInput
            fieldName={"qualityGateIds"}
            toolId={dataObject.getData("sfdxScanToolId")}
            model={dataObject}
            setModel={setDataObject}
            disabled={disabled}
        />
    );
}

SalesforceScanGatesMultiSelectInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default SalesforceScanGatesMultiSelectInput;

