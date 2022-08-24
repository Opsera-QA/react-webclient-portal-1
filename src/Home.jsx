import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import FreeTrialLanding from "components/trial/landing/FreeTrialLanding";
import OverviewLanding from "components/landing/OverviewLanding";

export default function Home() {
  const { authState } = useOktaAuth();

  if (authState?.isAuthenticated) {
    return (
      // <FreeTrialLanding
      // />
    <OverviewLanding
    />
    );
  }

  return <div>Loading...</div>;
}