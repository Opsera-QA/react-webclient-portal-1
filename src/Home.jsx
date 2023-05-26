import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import FreeTrialLanding from "components/trial/landing/FreeTrialLanding";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import OverviewLanding from "components/landing/OverviewLanding";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPlatformSettingsFeatureFlagByName from "hooks/platform/settings/useGetPlatformSettingsFeatureFlagByName";
import platformSettingFeatureConstants
  from "@opsera/definitions/constants/platform/settings/features/platformSettingFeature.constants";
import SoftwareDevelopmentLandingScreen from "components/landing/v2/software_development/SoftwareDevelopmentLandingScreen";

export default function Home() {
  const { authState } = useOktaAuth();
  const { isFreeTrial } = useComponentStateReference();
  const { isActive, isLoading } = useGetPlatformSettingsFeatureFlagByName(platformSettingFeatureConstants.IN_USE_PLATFORM_SETTING_FEATURE_NAMES.NEXT_GENERATION_LANDING_PAGE);

  if (authState?.isAuthenticated !== true || isLoading === true) {
    return (
      <CenterLoadingIndicator
        customMessage={"Loading..."}
        minHeight={screenContainerHeights.SCREEN_CONTAINER_HEIGHT}
      />
    );
  }

  if (isFreeTrial === true) {
    return (<FreeTrialLanding />);
  }

  if (isActive === true) {
    return (<SoftwareDevelopmentLandingScreen />);
  }

  return (<OverviewLanding />);
}