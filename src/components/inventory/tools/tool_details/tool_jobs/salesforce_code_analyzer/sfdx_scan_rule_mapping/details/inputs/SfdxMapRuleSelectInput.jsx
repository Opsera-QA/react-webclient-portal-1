import React from "react";
import PropTypes from "prop-types";
import SfdxRuleSelectInput from "../../../../../../../../common/list_of_values_input/tools/sfdx_scan/PmdRuleSelectInput";

function SfdxMapRuleSelectInput({ visible, model, setModel, disabled, fieldName, typeFilter }) {
    const setDataFunction = (fieldName, selectedOption) => {
        let newModel = { ...model };
        newModel.setData(fieldName, selectedOption?.rule || "");
        setModel({ ...newModel });
    };

    const clearDataFunction = (fieldName, selectedOption) => {
        let newModel = { ...model };
        newModel.setData("qualityGates",  []);
        setModel({ ...newModel });
    };

    return (
        <SfdxRuleSelectInput
            setModel={setModel}
            model={model}
            typeFilter={typeFilter}
            setDataFunction={setDataFunction}
            clearDataFunction={clearDataFunction}
            fieldName={fieldName}
            disabled={disabled}
        />
    );
}

SfdxMapRuleSelectInput.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    typeFilter: PropTypes.string,
    disabled: PropTypes.bool,
    fieldName: PropTypes.string,
    visible: PropTypes.bool,
};

SfdxMapRuleSelectInput.defaultProps = {
    visible: true,
    fieldName: "rule",
};

export default SfdxMapRuleSelectInput;
