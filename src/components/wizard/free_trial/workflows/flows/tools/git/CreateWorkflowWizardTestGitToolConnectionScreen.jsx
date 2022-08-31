import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";

export default function CreateWorkflowWizardTestGitToolConnectionScreen({
  gitToolId,
  gitToolOption,
  onSuccessFunction,
  onFailureFunction,
  setButtonContainer,
  className,
}) {
  return (
    <WorkflowWizardToolConnectionScreenBase
      className={className}
      onSuccessFunction={onSuccessFunction}
      toolId={gitToolId}
      onFailureFunction={onFailureFunction}
      toolName={capitalizeFirstLetter(gitToolOption)}
      setButtonContainer={setButtonContainer}
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
};


