import React from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";
import WorkflowWizardToolConnectionScreenBase
  from "components/wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";

export default function CreateWorkflowWizardTestSalesforceToolConnectionScreenBase(
  {
    salesforceToolId,
    onSuccessFunction,
    onFailureFunction,
    setButtonContainer,
    className,
    successText,
    failureText,
    type,
  }) {
  const initialTitle = `Salesforce Account Connection Test`;
  const title = hasStringValue(type) === true ? `${type} ${initialTitle}` : initialTitle;

  return (
    <WorkflowWizardToolConnectionScreenBase
      className={className}
      onSuccessFunction={onSuccessFunction}
      toolId={salesforceToolId}
      onFailureFunction={onFailureFunction}
      setButtonContainer={setButtonContainer}
      toolName={"Sfdc"}
      successText={successText}
      failureText={failureText}
      title={title}
    />
  );
}

CreateWorkflowWizardTestSalesforceToolConnectionScreenBase.propTypes = {
  className: PropTypes.string,
  onSuccessFunction: PropTypes.func,
  onFailureFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  salesforceToolId: PropTypes.string,
  successText: PropTypes.string,
  failureText: PropTypes.string,
  type: PropTypes.string,
};

CreateWorkflowWizardTestSalesforceToolConnectionScreenBase.defaultProps = {
  className: "m-3",
};
