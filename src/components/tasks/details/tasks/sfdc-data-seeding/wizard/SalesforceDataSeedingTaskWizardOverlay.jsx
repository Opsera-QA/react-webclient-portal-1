import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforceDataSeedingTaskWizard from "./SalesforceDataSeedingTaskWizard";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";

export const SALESFORCE_DATA_SEEDING_TASK_WIZARD_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  TASK_WIZARD: "task_wizard",
};

function SalesforceDataSeedingTaskWizardOverlay({ taskModel }) {
  // const [currentScreen, setCurrentScreen] = useState(
  //   taskModel.canUpdate() ? SALESFORCE_CUSTOM_SETTING_MIGRATION_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN : SALESFORCE_CUSTOM_SETTING_MIGRATION_TASK_WIZARD_SCREENS.TASK_WIZARD
  // );
  const [currentScreen, setCurrentScreen] = useState(
    SALESFORCE_DATA_SEEDING_TASK_WIZARD_SCREENS.TASK_WIZARD,
  );
  const [internalTaskModel, setInternalTaskModel] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (taskModel) {
      setInternalTaskModel({ ...taskModel });
    }
  }, [taskModel]);

  const getBody = () => {
    return (
      <SalesforceDataSeedingTaskWizard
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
      titleText={`Salesforce Custom Setting Migration Wizard`}
      titleIcon={faSalesforce}
      showToasts={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceDataSeedingTaskWizardOverlay.propTypes = {
  taskModel: PropTypes.object,
};

export default SalesforceDataSeedingTaskWizardOverlay;
