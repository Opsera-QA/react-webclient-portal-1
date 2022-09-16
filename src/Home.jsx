import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import OverviewLanding from "components/landing/OverviewLanding";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";

export default function Home() {
  const { authState } = useOktaAuth();

  if (authState?.isAuthenticated === true) {
    return <OverviewLanding/>;
  }

  return (
    <CenterLoadingIndicator
      customMessage={"Loading..."}
      minHeight={screenContainerHeights.SCREEN_CONTAINER_HEIGHT}
    />
  );
}