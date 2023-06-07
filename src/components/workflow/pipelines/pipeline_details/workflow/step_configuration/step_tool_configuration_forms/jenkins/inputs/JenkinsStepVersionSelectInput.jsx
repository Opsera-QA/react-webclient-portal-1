import React from 'react';
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JenkinsStepVersionSelectInput({ model, setModel }) {

    const XCODE_VERSIONS = ["11.7", "12.5", "13.4.1", "14.3"];

    return (
        <SelectInputBase
            fieldName={"xcodeVersion"}
            dataObject={model}
            setDataObject={setModel}
            placeholderText={"Select Version"}
            selectOptions={XCODE_VERSIONS}
        />
    )
}

JenkinsStepVersionSelectInput.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
}
export default JenkinsStepVersionSelectInput;