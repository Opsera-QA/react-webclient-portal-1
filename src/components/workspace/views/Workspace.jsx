import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkspaceViewContainer from "components/workspace/views/WorkspaceViewContainer";
import useGetWorkspaceItems from "hooks/workspace/useGetWorkspaceItems";
import useGetPlatformSettingsFeatureFlagByName from "hooks/platform/settings/useGetPlatformSettingsFeatureFlagByName";
import platformSettingFeatureConstants
  from "@opsera/definitions/constants/platform/settings/features/platformSettingFeature.constants";

export default function Workspace() {
  const {
    workspaceItems,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    error,
    loadData,
  } = useGetWorkspaceItems();
  const {isActive} = useGetPlatformSettingsFeatureFlagByName(platformSettingFeatureConstants.IN_USE_PLATFORM_SETTING_FEATURE_NAMES.NEXT_GENERATION_WORKSPACE);

  if (isActive !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"workspace"}
      error={error}
    >
      <WorkspaceViewContainer
        workspaceFilterModel={workspaceFilterModel}
        setWorkspaceFilterModel={setWorkspaceFilterModel}
        loadData={loadData}
        isLoading={isLoading}
        workspaceItems={workspaceItems}
      />
    </ScreenContainer>
  );
}
