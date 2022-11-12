import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  jenkinsToolAccountMetadata
} from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccount.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import jenkinsAccountActions
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccounts.actions";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

export default function CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase(
  {
    gitToolId,
    jenkinsToolId,
    gitToolOption,
    onSuccessFunction,
    onFailureFunction,
    setButtonContainer,
    className,
  }) {
  const [status, setStatus] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase />
      );
    }

    createAccount().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const createAccount = async () => {
    try {
      setStatus(buttonLabelHelper.BUTTON_STATES.BUSY);
      const jenkinsAccount = {
        toolId: jenkinsToolId,
        service: gitToolOption,
        credentailsToolId: gitToolId,
        credentialsId: gitToolId,
        credentialsDescription: gitToolId,
      };
      const newAccountModel = modelHelpers.parseObjectIntoModel(
        jenkinsAccount,
        jenkinsToolAccountMetadata,
      );
      await jenkinsAccountActions.createJenkinsAccountV2(
        getAccessToken,
        cancelTokenSource,
        jenkinsToolId,
        newAccountModel,
      );
      setStatus(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      onSuccessFunction();
    } catch (error) {
      if (isMounted?.current === true) {
        setStatus(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showInlineErrorMessage(
          error,
          "Error Configuring Workflow: ",
        );
        onFailureFunction();
      }
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      status,
      `Configuring Workflow`,
      `Configuring Workflow`,
      `Configured Workflow!`,
      `Error Configuring Workflow!`,
    );
  };

  if (onSuccessFunction == null || onFailureFunction == null) {
    return null;
  }

  return (
    <div
      style={{
        height: "500px",
      }}
      className={className}
    >
      <CenterLoadingIndicator customMessage={getLabel()} />
    </div>
  );
}

CreateWorkflowWizardRegisterGitCredentialsInJenkinsToolScreenBase.propTypes = {
  gitToolId: PropTypes.string,
  jenkinsToolId: PropTypes.string,
  className: PropTypes.string,
  onSuccessFunction: PropTypes.func,
  onFailureFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  gitToolOption: PropTypes.string,
};


