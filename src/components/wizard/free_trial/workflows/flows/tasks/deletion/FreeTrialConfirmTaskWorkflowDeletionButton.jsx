import React, { useState } from "react";
import PropTypes from "prop-types";
import DeleteButtonBase from "temp-library-components/button/delete/DeleteButtonBase";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import taskActions from "components/tasks/task.actions";

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
      await taskActions.deleteTask(
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
        normalText={"Confirm Task Deletion"}
        busyText={"Deleting Task"}
        successText={"Successfully Deleted Task"}
        errorText={"Failed to Delete Task"}
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


