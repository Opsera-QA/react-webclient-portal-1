import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforceBulkMigrationWizard
  from "components/workflow/wizards/salesforce_bulk_migration/SalesforceBulkMigrationWizard";
import SalesforceBranchStructureTaskPreRunTaskScreen
  from "components/tasks/details/tasks/sfdc-branch-structure/run/SalesforceBranchStructureTaskPreRunTaskScreen";

export const SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  TASK_WIZARD: "task_wizard",
};

export default function SalesforceBranchStructureTaskInitializationOverlay({ taskModel }) {
  const [currentScreen, setCurrentScreen] = useState(SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN);
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
    if (currentScreen === SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN) {
      return (
        <SalesforceBranchStructureTaskPreRunTaskScreen
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
      titleText={`Salesforce Branch Structure Task Initialization`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceBranchStructureTaskInitializationOverlay.propTypes = {
  taskModel: PropTypes.object
};
