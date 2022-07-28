import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ArgoCdStepKustomizeBooleanInput({model, setModel, disabled}) {

    return (
        <BooleanToggleInput
            fieldName={"kustomizeFlag"}
            dataObject={model}
            setDataObject={setModel}
            disabled={disabled}
        />
    );
}

ArgoCdStepKustomizeBooleanInput.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    disabled: PropTypes.bool,
};

export default ArgoCdStepKustomizeBooleanInput;