import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SfdxMapRuleBasedToggleInput(
    {
        model,
        setModel,
        disabled,
    }) {
    const setDataFunction = (fieldName, newValue) => {
        const newModel = {...model};
        newModel?.setData(fieldName, newValue);
        newModel?.setData("qualityGates", []);
        setModel({...newModel});
    };

    return (
        <BooleanToggleInput
            dataObject={model}
            setDataObject={setModel}
            setDataFunction={setDataFunction}
            fieldName={"isRuleBased"}
            disabled={disabled}
        />
    );
}

SfdxMapRuleBasedToggleInput.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    disabled: PropTypes.bool,
};

export default SfdxMapRuleBasedToggleInput;
