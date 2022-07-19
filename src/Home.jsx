import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import PipelinesLanding from "components/free_trial/pipelines/PipelinesLanding";

function Home() {
  const { authState } = useOktaAuth();

  if (authState?.isAuthenticated) {
    return (
      <PipelinesLanding
      />
    );
  }

  return <div>Loading...</div>;
}

export default Home;
