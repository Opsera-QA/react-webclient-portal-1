import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { PIPELINE_START_WIZARD_FLOWS } from "components/workflow/pipelines/pipeline_details/PipelineStartWizard";
import SalesforceTaskWizardPreRunTaskScreen
  from "components/tasks/wizard/organization_sync/pre_run_tasks/SalesforceTaskWizardPreRunTaskScreen";

export const SALESFORCE_TASK_WIZARD_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  SALESFORCE_TASK_WIZARD: "salesforce_task_wizard",
};

export default function SalesforceTaskWizardOverlay({ gitTasksData }) {
  const [currentScreen, setCurrentScreen] = useState(PIPELINE_START_WIZARD_FLOWS.PRE_RUN_TASK_SCREEN);
  const [internalTaskModel, setInternalTaskModel] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (gitTasksData) {
      setInternalTaskModel({...gitTasksData});
    }
  }, [gitTasksData]);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    // history.push(`/task`);
  };

  const getBody = () => {
    if (currentScreen === PIPELINE_START_WIZARD_FLOWS.PRE_RUN_TASK_SCREEN) {
      return (
        <SalesforceTaskWizardPreRunTaskScreen
          setCurrentScreen={setCurrentScreen}
          task={internalTaskModel}
          setTask={setInternalTaskModel}
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

SalesforceTaskWizardOverlay.propTypes = {
  gitTasksData: PropTypes.object
};