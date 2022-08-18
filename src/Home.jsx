import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import FreeTrialLanding from "components/trial/landing/FreeTrialLanding";

export default function Home() {
  const { authState } = useOktaAuth();

  if (authState?.isAuthenticated) {
    return (
      <FreeTrialLanding
      />
    );
  }

  return <div>Loading...</div>;
}