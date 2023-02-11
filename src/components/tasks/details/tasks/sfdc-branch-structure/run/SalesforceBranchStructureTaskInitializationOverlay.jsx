import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SalesforceBranchStructureTaskPreRunTaskScreen
  from "components/tasks/details/tasks/sfdc-branch-structure/run/SalesforceBranchStructureTaskPreRunTaskScreen";
import SalesforceBranchStructureTaskRunTaskConfirmationScreen
  from "components/tasks/details/tasks/sfdc-branch-structure/run/SalesforceBranchStructureTaskRunTaskConfirmationScreen";

export const SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  TASK_WIZARD: "task_wizard",
};

export default function SalesforceBranchStructureTaskInitializationOverlay({taskModel}) {
  const [currentScreen, setCurrentScreen] = useState(
    taskModel.canUpdate() ? SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN : SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS.TASK_WIZARD
  );
  const [internalTaskModel, setInternalTaskModel] = useState(undefined);

  useEffect(() => {
    if (taskModel) {
      setInternalTaskModel({...taskModel});
    }
  }, [taskModel]);

  if (currentScreen === SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN) {
    return (
      <SalesforceBranchStructureTaskPreRunTaskScreen
        setCurrentScreen={setCurrentScreen}
        taskModel={internalTaskModel}
        setTaskModel={setInternalTaskModel}
      />
    );
  }

  return (
    <SalesforceBranchStructureTaskRunTaskConfirmationScreen
      taskModel={taskModel}
      setCurrentScreen={setCurrentScreen}
    />
  );
}

SalesforceBranchStructureTaskInitializationOverlay.propTypes = {
  taskModel: PropTypes.object
};
