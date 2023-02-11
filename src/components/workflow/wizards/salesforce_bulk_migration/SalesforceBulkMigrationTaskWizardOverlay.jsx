import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforceBulkMigrationWizard
  from "components/workflow/wizards/salesforce_bulk_migration/SalesforceBulkMigrationWizard";
import SalesforceBulkMigrationTaskWizardPreRunTaskScreen
  from "components/workflow/wizards/salesforce_bulk_migration/pre_run/SalesforceBulkMigrationTaskWizardPreRunTaskScreen";

export const SALESFORCE_BULK_MIGRATION_TASK_WIZARD_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  TASK_WIZARD: "task_wizard",
};

function SalesforceBulkMigrationTaskWizardOverlay({ taskModel }) {
  const [currentScreen, setCurrentScreen] = useState(SALESFORCE_BULK_MIGRATION_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN);
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
    if (currentScreen === SALESFORCE_BULK_MIGRATION_TASK_WIZARD_SCREENS.PRE_RUN_TASK_SCREEN) {
      return (
        <SalesforceBulkMigrationTaskWizardPreRunTaskScreen
          setCurrentScreen={setCurrentScreen}
          taskModel={internalTaskModel}
          setTaskModel={setInternalTaskModel}
          className={"m-3"}
        />
      );
    }

    return (
      <SalesforceBulkMigrationWizard
        taskModel={taskModel}
        handleClose={closePanel}
      />
    );
  };


  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Salesforce Bulk Migration Wizard`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceBulkMigrationTaskWizardOverlay.propTypes = {
  taskModel: PropTypes.object
};

export default SalesforceBulkMigrationTaskWizardOverlay;