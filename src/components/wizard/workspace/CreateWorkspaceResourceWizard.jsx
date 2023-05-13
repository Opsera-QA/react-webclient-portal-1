import React, { useState } from "react";
import CreateWorkspaceResourceWizardResourceSelectionScreen
  from "components/wizard/workspace/CreateWorkspaceResourceWizardResourceSelectionScreen";
import NewTaskOverlay from "components/tasks/NewTaskOverlay";
import PropTypes from "prop-types";
import NewToolOverlay from "components/inventory/tools/create_overlay/NewToolOverlay";
import NewPipelineOverlay from "components/workflow/create/NewPipelineOverlay";
import useGetPlatformSettingsFeatureFlagByName from "hooks/platform/settings/useGetPlatformSettingsFeatureFlagByName";
import platformSettingFeatureConstants
  from "@opsera/definitions/constants/platform/settings/features/platformSettingFeature.constants";
import CreateToolRegistryWizard from "components/inventory/tools/tool_details/wizards/CreateToolRegistryWizard";
import CreateTasksWizard from "../../tasks/portal_tasks_wizard/CreateTasksWizard";

export const CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS = {
  RESOURCE_SELECTION_SCREEN: "resource_selection_screen",
  CREATE_TOOL_SCREEN: "create_tool_screen",
  CREATE_TASK_SCREEN: "create_task_screen",
  CREATE_PIPELINE_SCREEN: "create_pipeline_screen",
};

export default function CreateWorkspaceResourceWizard({ loadDataFunction }) {
  const [currentScreen, setCurrentScreen] = useState(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.RESOURCE_SELECTION_SCREEN);
  const {isActive} = useGetPlatformSettingsFeatureFlagByName(platformSettingFeatureConstants.IN_USE_PLATFORM_SETTING_FEATURE_NAMES.NEXT_GENERATION_WIZARDS_TOGGLE);

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
        if (isActive === true) {
          return (
            <CreateTasksWizard
              loadData={loadDataFunction}
              backButtonFunction={backButtonFunction}
            />
          );
        }

        return (
          <NewTaskOverlay
            backButtonFunction={backButtonFunction}
            loadData={loadDataFunction}
          />
        );
      case CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.CREATE_TOOL_SCREEN:
        if (isActive) {
          return (
            <CreateToolRegistryWizard
              loadData={loadDataFunction}
              backButtonFunction={backButtonFunction}
            />
          );
        }
        
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
