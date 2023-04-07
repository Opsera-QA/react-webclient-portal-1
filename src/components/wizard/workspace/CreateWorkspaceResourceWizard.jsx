import React, { useState } from "react";
import CreateWorkspaceResourceWizardResourceSelectionScreen
  from "components/wizard/workspace/CreateWorkspaceResourceWizardResourceSelectionScreen";
import NewTaskOverlay from "components/tasks/NewTaskOverlay";
import PropTypes from "prop-types";
import NewToolOverlay from "components/inventory/tools/create_overlay/NewToolOverlay";
import NewPipelineOverlay from "components/workflow/create/NewPipelineOverlay";

export const CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS = {
  RESOURCE_SELECTION_SCREEN: "resource_selection_screen",
  CREATE_TOOL_SCREEN: "create_tool_screen",
  CREATE_TASK_SCREEN: "create_task_screen",
  CREATE_PIPELINE_SCREEN: "create_pipeline_screen",
};

export default function CreateWorkspaceResourceWizard({ loadDataFunction }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.RESOURCE_SELECTION_SCREEN);
  const backButtonFunction = () => {
    setCurrentScreen(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.RESOURCE_SELECTION_SCREEN);
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.RESOURCE_SELECTION_SCREEN:
        return (
          <CreateWorkspaceResourceWizardResourceSelectionScreen
            setCurrentScreen={setCurrentScreen}
          />
        );
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.CREATE_PIPELINE_SCREEN:
        return (
          <NewPipelineOverlay
            backButtonFunction={backButtonFunction}
            loadData={loadDataFunction}
          />
        );
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.CREATE_TASK_SCREEN:
        return (
          <NewTaskOverlay
            backButtonFunction={backButtonFunction}
            loadData={loadDataFunction}
          />
        );
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.CREATE_TOOL_SCREEN:
        return (
          <NewToolOverlay
            loadData={loadDataFunction}
            backButtonFunction={backButtonFunction}
          />
        );
      default:
        return null;
    }
  };

  return (getCurrentScreen());
}

CreateWorkspaceResourceWizard.propTypes = {
  loadDataFunction: PropTypes.func,
};
