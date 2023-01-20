import React, { useEffect, useState } from "react";
import CreateSalesforceWorkflowWizardFlowSelectionScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardFlowSelectionScreen";
import CreateSalesforceWorkflowWizardFlowWrapper
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/wizards/CreateSalesforceWorkflowWizardFlowWrapper";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import accountsActions from "components/admin/accounts/accounts-actions";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import {
  OVERLAY_PANEL_MIN_HEIGHT_MINUS_TITLE,
} from "components/common/overlays/center/CenterOverlayContainer";
import FreeTrialAccountPipelineLimitReachedSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/pipeline/limitation/FreeTrialAccountPipelineLimitReachedSalesforceWorkflowScreen";
import FreeTrialAccountTaskLimitReachedSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/tasks/limitation/FreeTrialAccountTaskLimitReachedSalesforceWorkflowScreen";
import FreeTrialDeletePipelineWorkflowConfirmationScreen
  from "components/wizard/free_trial/workflows/flows/pipeline/deletion/FreeTrialDeletePipelineWorkflowConfirmationScreen";
import FreeTrialDeleteTaskWorkflowConfirmationScreen
  from "components/wizard/free_trial/workflows/flows/tasks/deletion/FreeTrialDeleteTaskWorkflowConfirmationScreen";

export const CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS = {
  SELECT_FLOW_SCREEN: "select_flow_screen",
  WIZARD_FLOW_SCREEN: "wizard_flow_screen",
  PIPELINE_LIMIT_REACHED_SCREEN: "pipeline_limit_reached_screen",
  DELETE_PIPELINE_CONFIRMATION_SCREEN: "delete_pipeline_confirmation_screen",
  TASK_LIMIT_REACHED_SCREEN: "task_limit_reached_screen",
  DELETE_TASK_CONFIRMATION_SCREEN: "delete_task_confirmation_screen",
};

export default function CreateSalesforceWorkflowWizard(
  {
    backButtonFunction,
    setButtonContainer,
  }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  const [selectedFlow, setSelectedFlow] = useState(undefined);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [accountMetrics, setAccountMetrics] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
    themeConstants,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getAccountMetrics();
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getAccountMetrics = async () => {
    const response = await accountsActions.getFreeTrialAccountWorkflowMetrics(
      getAccessToken,
      cancelTokenSource,
    );
    const metrics = response?.data?.data;

    if (isMounted?.current === true && metrics) {
      setAccountMetrics(metrics);
    }
  };

  const goBackToFlowSelectionScreenFunction = () => {
    setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowSelectionScreen
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            accountMetrics={accountMetrics}
            className={"m-4"}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WIZARD_FLOW_SCREEN:
        return (
          <CreateSalesforceWorkflowWizardFlowWrapper
            flow={selectedFlow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={goBackToFlowSelectionScreenFunction}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.PIPELINE_LIMIT_REACHED_SCREEN:
        return (
          <FreeTrialAccountPipelineLimitReachedSalesforceWorkflowScreen
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            pipelineCounts={accountMetrics?.pipelineCounts}
            isAccountWhitelisted={accountMetrics != null && accountMetrics?.expiration == null}
            setButtonContainer={setButtonContainer}
            setCurrentScreen={setCurrentScreen}
            setSelectedWorkflowId={setSelectedWorkflowId}
            selectedWorkflowId={selectedWorkflowId}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.DELETE_PIPELINE_CONFIRMATION_SCREEN:
        return (
          <FreeTrialDeletePipelineWorkflowConfirmationScreen
            setSelectedFlow={setSelectedFlow}
            setCurrentScreen={setCurrentScreen}
            setSelectedWorkflowId={setSelectedWorkflowId}
            selectedWorkflowId={selectedWorkflowId}
            setButtonContainer={setButtonContainer}
            loadData={loadData}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.TASK_LIMIT_REACHED_SCREEN:
        return (
          <FreeTrialAccountTaskLimitReachedSalesforceWorkflowScreen
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            taskCounts={accountMetrics?.taskCounts}
            isAccountWhitelisted={accountMetrics != null && accountMetrics?.expiration == null}
            setButtonContainer={setButtonContainer}
            setCurrentScreen={setCurrentScreen}
            setSelectedWorkflowId={setSelectedWorkflowId}
            selectedWorkflowId={selectedWorkflowId}
          />
        );
      case CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.DELETE_TASK_CONFIRMATION_SCREEN:
        return (
          <FreeTrialDeleteTaskWorkflowConfirmationScreen
            setSelectedFlow={setSelectedFlow}
            setCurrentScreen={setCurrentScreen}
            setSelectedWorkflowId={setSelectedWorkflowId}
            selectedWorkflowId={selectedWorkflowId}
            setButtonContainer={setButtonContainer}
            loadData={loadData}
          />
        );
    }
  };

  if (isLoading === true) {
    return (
      <CenterLoadingIndicator
        minHeight={OVERLAY_PANEL_MIN_HEIGHT_MINUS_TITLE}
        customMessage={"Initializing Workflow Options"}
      />
    );
  }

  if (accountMetrics == null) {
    return (
      <div>
        Could not initialize Workflow options. Please close this overlay and try once again.
      </div>
    );
  }

  return (
    <>
      {getCurrentScreen()}
    </>
  );
}

CreateSalesforceWorkflowWizard.propTypes = {
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

