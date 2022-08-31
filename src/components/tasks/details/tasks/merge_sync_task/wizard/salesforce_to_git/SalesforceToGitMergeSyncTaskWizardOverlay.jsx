import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforceToGitMergeSyncTaskWizard
  from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import SalesforceToGitMergeSyncTaskWizardPreRunTaskScreen
  from "components/tasks/details/tasks/merge_sync_task/wizard/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardPreRunTaskScreen";

export const SALESFORCE_TO_GIT_TASK_WIZARD_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  SALESFORCE_TASK_WIZARD: "salesforce_task_wizard",
};

export default function SalesforceToGitMergeSyncTaskWizardOverlay({ taskModel }) {
  const [currentScreen, setCurrentScreen] = useState(SALESFORCE_TO_GIT_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN);
  const history = useHistory();
  const {
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const [internalTaskModel, setInternalTaskModel] = useState(undefined);

  useEffect(() => {
    if (taskModel) {
      setInternalTaskModel({...taskModel});
    }
  }, [taskModel]);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();

    if (isOpseraAdministrator === true) {
      history.push(`/task`);
    } else {
      history.push(`/`);
    }
  };

  const getBody = () => {
    if (currentScreen === SALESFORCE_TO_GIT_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN) {
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
        taskModel={taskModel}
        handleClose={closePanel}
      />
    );
  };

  if (internalTaskModel == null) {
    return null;
  }

  console.log("internalTaskModel: " + JSON.stringify(internalTaskModel?.getPersistData()));

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