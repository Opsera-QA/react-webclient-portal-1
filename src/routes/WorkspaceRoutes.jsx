import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Workspace from "components/workspace/views/Workspace";
import useGetPlatformSettingsFeatureFlagByName from "hooks/platform/settings/useGetPlatformSettingsFeatureFlagByName";
import platformSettingFeatureConstants
  from "@opsera/definitions/constants/platform/settings/features/platformSettingFeature.constants";

export default function WorkspaceRoutes() {
  const {isActive} = useGetPlatformSettingsFeatureFlagByName(platformSettingFeatureConstants.IN_USE_PLATFORM_SETTING_FEATURE_NAMES.NEXT_GENERATION_WORKSPACE);

  if (isActive !== true) {
    return null;
  }

  return (
    <>
      <SecureRoute
        path={"/workspace"}
        exact
        component={Workspace}
      />
    </>
  );
}

WorkspaceRoutes.propTypes = {};

