import React from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";
import WorkflowWizardToolConnectionScreenBase
    from "components/wizard/portal/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";

export default function CreateWorkflowWizardTestJenkinsToolConnectionScreenBase(
    {
        jenkinsToolId,
        onSuccessFunction,
        onFailureFunction,
        setButtonContainer,
        className,
        successText,
        failureText,
        type,
    }) {
    const initialTitle = `Jenkins Account Connection Test`;
    const title = hasStringValue(type) === true ? `${type} ${initialTitle}` : initialTitle;

    return (
        <WorkflowWizardToolConnectionScreenBase
            className={className}
            onSuccessFunction={onSuccessFunction}
            toolId={jenkinsToolId}
            onFailureFunction={onFailureFunction}
            setButtonContainer={setButtonContainer}
            toolName={"jenkins"}
            successText={successText}
            failureText={failureText}
            title={title}
        />
    );
}

CreateWorkflowWizardTestJenkinsToolConnectionScreenBase.propTypes = {
    className: PropTypes.string,
    onSuccessFunction: PropTypes.func,
    onFailureFunction: PropTypes.func,
    setButtonContainer: PropTypes.func,
    jenkinsToolId: PropTypes.string,
    successText: PropTypes.string,
    failureText: PropTypes.string,
    type: PropTypes.string,
};

CreateWorkflowWizardTestJenkinsToolConnectionScreenBase.defaultProps = {
    className: "m-3",
};
