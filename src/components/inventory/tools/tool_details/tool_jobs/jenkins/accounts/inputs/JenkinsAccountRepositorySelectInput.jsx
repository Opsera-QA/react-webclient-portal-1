import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../../../common/inputs/select/SelectInputBase";

function JenkinsAccountRepositorySelectInput({ visible, model, setModel, disabled, fieldName, repos }) {
    const setDataFunction = (fieldName, selectedOption) => {
        let newModel = { ...model };
        newModel.setData(fieldName, selectedOption?._id || "");
        newModel.setData("accountUserName", selectedOption?.configuration?.accountUsername || "");
        setModel({ ...newModel });
    };

    return (
        <SelectInputBase
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            selectOptions={repos}
            setDataFunction={setDataFunction}
            valueField={"_id"}
            textField={"name"}
            disabled={disabled}
        />
    );
}

JenkinsAccountRepositorySelectInput.propTypes = {
    model: PropTypes.object,
    repos: PropTypes.array,
    setModel: PropTypes.func,
    disabled: PropTypes.bool,
    fieldName: PropTypes.string,
    visible: PropTypes.bool,
};

JenkinsAccountRepositorySelectInput.defaultProps = {
    visible: true,
    fieldName: "repositoryId",
};

export default JenkinsAccountRepositorySelectInput;
