import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforceCustomSettingMigrationTaskWizard from "./SalesforceCustomSettingMigrationTaskWizard";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";

export const SALESFORCE_CUSTOM_SETTING_MIGRATION_TASK_WIZARD_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  TASK_WIZARD: "task_wizard",
};

function SalesforceCustomSettingMigrationTaskWizardOverlay({ taskModel }) {
  // const [currentScreen, setCurrentScreen] = useState(
  //   taskModel.canUpdate() ? SALESFORCE_CUSTOM_SETTING_MIGRATION_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN : SALESFORCE_CUSTOM_SETTING_MIGRATION_TASK_WIZARD_SCREENS.TASK_WIZARD
  // );
  const [currentScreen, setCurrentScreen] = useState(
    SALESFORCE_CUSTOM_SETTING_MIGRATION_TASK_WIZARD_SCREENS.TASK_WIZARD,
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
      <SalesforceCustomSettingMigrationTaskWizard
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

SalesforceCustomSettingMigrationTaskWizardOverlay.propTypes = {
  taskModel: PropTypes.object,
};

export default SalesforceCustomSettingMigrationTaskWizardOverlay;
