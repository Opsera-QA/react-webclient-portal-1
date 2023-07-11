import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforceToGitMergeSyncTaskWizard
from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizard";
import SalesforceToGitMergeSyncTaskWizardPreRunTaskScreen
from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardPreRunTaskScreen";

export const SALESFORCE_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  TASK_WIZARD: "task_wizard",
};

function SalesforceToGitMergeSyncTaskWizardOverlay({ taskModel }) {
  const [currentScreen, setCurrentScreen] = useState(
    taskModel.canUpdate() ? SALESFORCE_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN : SALESFORCE_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.TASK_WIZARD
  );
  const [internalTaskModel, setInternalTaskModel] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (taskModel) {
      setInternalTaskModel({...taskModel});
    }
  }, [taskModel]);

  const getBody = () => {
    if (currentScreen === SALESFORCE_TO_GIT_MERGE_SYNC_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN) {
      return (
        <SalesforceToGitMergeSyncTaskWizardPreRunTaskScreen
          setCurrentScreen={setCurrentScreen}
          taskModel={internalTaskModel}
          setTaskModel={setInternalTaskModel}
          className={"m-3"}
        />
      );
    }

    return (
      <SalesforceToGitMergeSyncTaskWizard
        taskModel={internalTaskModel}
        handleClose={closePanel}
      />
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Salesforce to Git Merge Sync Wizard`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceToGitMergeSyncTaskWizardOverlay.propTypes = {
  taskModel: PropTypes.object
};

export default SalesforceToGitMergeSyncTaskWizardOverlay;