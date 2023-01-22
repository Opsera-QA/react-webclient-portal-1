import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import FreeTrialLanding from "components/trial/landing/FreeTrialLanding";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import OverviewLanding from "components/landing/OverviewLanding";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function Home() {
  const { authState } = useOktaAuth();
  const { isFreeTrial } = useComponentStateReference();

  if (authState?.isAuthenticated !== true) {
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

  return (<OverviewLanding />);
}