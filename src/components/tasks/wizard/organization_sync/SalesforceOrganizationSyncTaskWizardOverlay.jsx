import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforceOrganizationSyncTaskWizardPreRunTaskScreen
  from "components/tasks/wizard/organization_sync/pre_run_tasks/SalesforceOrganizationSyncTaskWizardPreRunTaskScreen";

export const SALESFORCE_ORGANIZATION_TASK_WIZARD_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  SALESFORCE_TASK_WIZARD: "salesforce_task_wizard",
};

export default function SalesforceOrganizationSyncTaskWizardOverlay({ taskModel }) {
  const [currentScreen, setCurrentScreen] = useState(
    taskModel.canUpdate() ? SALESFORCE_ORGANIZATION_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN : SALESFORCE_ORGANIZATION_TASK_WIZARD_SCREENS.SALESFORCE_TASK_WIZARD
  );
  const [internalTaskModel, setInternalTaskModel] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (taskModel) {
      setInternalTaskModel({...taskModel});
    }
  }, [taskModel]);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (currentScreen === SALESFORCE_ORGANIZATION_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN) {
      return (
        <SalesforceOrganizationSyncTaskWizardPreRunTaskScreen
          setCurrentScreen={setCurrentScreen}
          taskModel={internalTaskModel}
          setTaskModel={setInternalTaskModel}
          className={"m-3"}
        />
      );
    }

    return (
      <SfdcPipelineWizard
        gitTaskData={internalTaskModel}
        handleClose={closePanel}
        closePanel={closePanel}
      />
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Salesforce Task Run Initialization Wizard`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceOrganizationSyncTaskWizardOverlay.propTypes = {
  taskModel: PropTypes.object,
};