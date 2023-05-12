import React, { useEffect, useState } from "react";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import TasksSetupModeSelect from "./views/TasksSetupModeSelect";
import useGetNewTaskModel from "../hooks/useGetNewTaskModel";
import { capitalizeFirstLetter } from "../../common/helpers/string-helpers";
import NewTaskOverlay from "../NewTaskOverlay";
import TaskEditorPanel from "../details/TaskEditorPanel";
import TaskTypeSelect from "./views/TaskTypeSelect";
import WizardTaskConfigurationRouter from "./views/WizardTaskConfigurationRouter";

export const REGISTRY_WIZARD_SCREENS = {
  MODE_SELECT: "mode_select",
  TASK_SELECT: "task_select",
  BASIC_TOOL_INFO: "basic_tool_info",
  CONNECTION_INFO: "connection_info",
  CONNECTION_TEST: "connection_test",
  TASK_CONFIGURATION: "task_config",
  TASK_DETAIL: "task_detail",
};

export default function CreateTasksWizard({ loadData, backButtonFunction }) {
  const [currentScreen, setCurrentScreen] = useState(
    REGISTRY_WIZARD_SCREENS.MODE_SELECT,
  );
  const [buttonContainer, setButtonContainer] = useState(undefined);
  const history = useHistory();
  const [setUpMode, setSetupMode] = useState(undefined);
  const [taskType, setTaskType] = useState(undefined);
  const { taskModel, setTaskModel } = useGetNewTaskModel();
  const { toastContext } = useComponentStateReference();

  const REGISTRY_WIZARD_TITLES = {
    MODE_SELECT: "Step 1: Select Task Creation Method",
    TASK_SELECT: "Step 2: Select Task",
    BASIC_TOOL_INFO: "Step 3: Enter Basic Tool Information",
    CONNECTION_INFO: `Step 4: Configure ${capitalizeFirstLetter(
      taskModel?.getData("tool_identifier"),
    )} connection information`,
    CONNECTION_TEST: `Step 5: Validate ${capitalizeFirstLetter(
      taskModel?.getData("tool_identifier"),
    )} connection information`,
    TASK_CONFIGURATION: `${
      setUpMode && setUpMode === "wizard" ? "Step 3:" : "Step 2:"
    } Configure Task Details`,
  };
  const [overlayTitle, setOverlayTitle] = useState(
    REGISTRY_WIZARD_TITLES.MODE_SELECT,
  );

  useEffect(() => {
    switch (currentScreen) {
      case REGISTRY_WIZARD_SCREENS.MODE_SELECT:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.MODE_SELECT);
        return;
      case REGISTRY_WIZARD_SCREENS.TASK_SELECT:
        if (
          taskModel?.getData("tool_identifier") == null ||
          taskModel?.getData("tool_identifier") === ""
        ) {
          setOverlayTitle(REGISTRY_WIZARD_TITLES.TASK_SELECT);
          return;
        }
        setOverlayTitle(REGISTRY_WIZARD_TITLES.BASIC_TOOL_INFO);
        return;
      case REGISTRY_WIZARD_SCREENS.CONNECTION_INFO:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.CONNECTION_INFO);
        return;
      case REGISTRY_WIZARD_SCREENS.CONNECTION_TEST:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.CONNECTION_TEST);
        return;
      case REGISTRY_WIZARD_SCREENS.TASK_CONFIGURATION:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.TASK_CONFIGURATION);
        return;
    }
  }, [currentScreen, taskModel?.getData("tool_identifier")]);

  const closeOverlayFunction = () => {
    if (isMounted?.current === true) {
      loadData();
    }
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const routeToDetailView = () => {
    closeOverlayFunction();
    history.push(`/inventory/tools/details/${taskModel?.getData("_id")}`);
  };

  const getTaskConfigurationView = () => {
    if (setUpMode === "advanced") {
      return (
        <TaskEditorPanel
          taskData={taskModel}
          handleClose={closeOverlayFunction}
        />
      );
    }
    return (
      <WizardTaskConfigurationRouter
        flow={taskType}
        setButtonContainer={setButtonContainer}
        backButtonFunction={() => {setCurrentScreen(REGISTRY_WIZARD_SCREENS.TASK_SELECT);}}
        handleClose={closeOverlayFunction}
      />
    );
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case REGISTRY_WIZARD_SCREENS.MODE_SELECT:
        return (
          <TasksSetupModeSelect
            setCurrentScreen={setCurrentScreen}
            closeOverlayFunction={closeOverlayFunction}
            setButtonContainer={setButtonContainer}
            setSetupMode={setSetupMode}
            setupMode={setUpMode}
            className={"py-5"}
            backButtonFunction={backButtonFunction}
          />
        );
      case REGISTRY_WIZARD_SCREENS.TASK_CONFIGURATION:
        return getTaskConfigurationView();
      case REGISTRY_WIZARD_SCREENS.TASK_SELECT:
        return (
          <TaskTypeSelect
            selectedFlow={setUpMode}
            setSelectedFlow={setTaskType}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            backButtonFunction={() => {setCurrentScreen(REGISTRY_WIZARD_SCREENS.MODE_SELECT);}}
          />
        );
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closeOverlayFunction}
      titleText={overlayTitle}
      buttonContainer={buttonContainer}
      showCloseButton={false}
    >
      {getCurrentScreen()}
    </CenterOverlayContainer>
  );
}

CreateTasksWizard.propTypes = {
  loadData: PropTypes.func,
  backButtonFunction: PropTypes.func
};
