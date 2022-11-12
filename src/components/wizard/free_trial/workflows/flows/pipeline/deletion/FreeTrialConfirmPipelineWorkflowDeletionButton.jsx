import React, { useState } from "react";
import PropTypes from "prop-types";
import DeleteButtonBase from "temp-library-components/button/delete/DeleteButtonBase";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import pipelineActions from "components/workflow/pipeline-actions";

export default function FreeTrialConfirmTaskWorkflowDeletionButton(
  {
    setCurrentScreen,
    setSelectedFlow,
    className,
    selectedWorkflowId,
    setSelectedWorkflowId,
    loadData,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    toastContext,
    isMounted,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  const onClickFunction = async () => {
    try {
      toastContext.removeInlineMessage();
      toastContext.removeAllBanners();
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await pipelineActions.deletePipelineV2(
        getAccessToken,
        cancelTokenSource,
        selectedWorkflowId,
      );
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      setSelectedWorkflowId(undefined);
      setSelectedFlow(undefined);
      loadData();
      setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
      }
    }
  };

  return (
    <div className={className}>
      <DeleteButtonBase
        className={"mr-2"}
        onClickFunction={onClickFunction}
        buttonState={buttonState}
        normalText={"Confirm Pipeline Deletion"}
        busyText={"Deleting Pipeline"}
        successText={"Successfully Deleted Pipeline"}
        errorText={"Failed to Delete Pipeline"}
        disabled={isMongoDbId(selectedWorkflowId) !== true}
      />
    </div>
  );
}

FreeTrialConfirmTaskWorkflowDeletionButton.propTypes = {
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  selectedWorkflowId: PropTypes.string,
  setSelectedWorkflowId: PropTypes.func,
  loadData: PropTypes.func,
};


