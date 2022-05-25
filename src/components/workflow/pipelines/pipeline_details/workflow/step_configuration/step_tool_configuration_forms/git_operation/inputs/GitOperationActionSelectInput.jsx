import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
const GIT_OPERATION_ACTIONS = [
    {text: "Create PR", value: "pr-creation"},
    {text: "Create a Tag", value: "tag-creation"},
];

function GitOperationActionSelectInput({ fieldName, model, setModel, disabled }) {
    return (
        <SelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={GIT_OPERATION_ACTIONS}
            valueField={"value"}
            textField={"text"}
            disabled={disabled}
        />
    );
}

GitOperationActionSelectInput.propTypes = {
    fieldName: PropTypes.string,
    model: PropTypes.object,
    setModel: PropTypes.func,
    disabled: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array
    ]),
};

GitOperationActionSelectInput.defaultProps = {
    fieldName: "action",
    disabled: false
};

export default GitOperationActionSelectInput;