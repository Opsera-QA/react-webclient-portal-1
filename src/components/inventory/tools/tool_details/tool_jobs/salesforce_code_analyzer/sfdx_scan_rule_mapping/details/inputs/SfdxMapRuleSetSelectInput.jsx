import React from "react";
import PropTypes from "prop-types";
import SfdxRuleSetSelectInput from "../../../../../../../../common/list_of_values_input/tools/sfdx_scan/SfdxRuleSetSelectInput";

function SfdxMapRuleSetSelectInput({ visible, model, setModel, disabled, fieldName, typeFilter }) {
    const setDataFunction = (fieldName, selectedOption) => {
        let newModel = { ...model };
        newModel.setData("category", selectedOption);
        newModel.setData("qualityGates", []);
        setModel({ ...newModel });
    };

    const clearDataFunction = (fieldName, selectedOption) => {
        let newModel = { ...model };
        newModel.setData("category", "");
        newModel.setData("qualityGates", []);
        setModel({ ...newModel });
    };

    return (
        <SfdxRuleSetSelectInput
            setModel={setModel}
            model={model}
            setDataFunction={setDataFunction}
            clearDataFunction={clearDataFunction}
            fieldName={fieldName}
            disabled={disabled}
        />
    );
}

SfdxMapRuleSetSelectInput.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    typeFilter: PropTypes.string,
    disabled: PropTypes.bool,
    fieldName: PropTypes.string,
    visible: PropTypes.bool,
};

SfdxMapRuleSetSelectInput.defaultProps = {
    visible: true,
    fieldName: "ruleSet",
};

export default SfdxMapRuleSetSelectInput;
