import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

export default function CreateWorkflowWizardTestGitToolConnectionScreen({
  gitToolId,
  gitToolOption,
  onSuccessFunction,
  onFailureFunction,
  setButtonContainer,
  className,
  successText,
  failureText,
}) {
  if (hasStringValue(gitToolOption) !== true) {
    return null;
  }

  if (gitToolOption === toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB) {
    return (
      <WorkflowWizardToolConnectionScreenBase
        className={className}
        onSuccessFunction={onSuccessFunction}
        toolId={gitToolId}
        onFailureFunction={onFailureFunction}
        toolName={capitalizeFirstLetter(gitToolOption)}
        title={"Gitlab Account Connection Test"}
        setButtonContainer={setButtonContainer}
        successText={successText}
        failureText={failureText}
      />
    );
  }

  if (gitToolOption === toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB) {
    return (
      <WorkflowWizardToolConnectionScreenBase
        className={className}
        onSuccessFunction={onSuccessFunction}
        toolId={gitToolId}
        onFailureFunction={onFailureFunction}
        toolName={capitalizeFirstLetter(gitToolOption)}
        title={"Github Account Connection Test"}
        setButtonContainer={setButtonContainer}
        successText={successText}
        failureText={failureText}
      />
    );
  }

  return (
    <WorkflowWizardToolConnectionScreenBase
      className={className}
      onSuccessFunction={onSuccessFunction}
      toolId={gitToolId}
      onFailureFunction={onFailureFunction}
      toolName={capitalizeFirstLetter(gitToolOption)}
      title={`${capitalizeFirstLetter(gitToolOption)} Account Connection Test`}
      setButtonContainer={setButtonContainer}
      successText={successText}
      failureText={failureText}
    />
  );
}

CreateWorkflowWizardTestGitToolConnectionScreen.propTypes = {
  gitToolId: PropTypes.string,
  className: PropTypes.string,
  onSuccessFunction: PropTypes.func,
  onFailureFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  gitToolOption: PropTypes.string,
  successText: PropTypes.string,
  failureText: PropTypes.string,
};


