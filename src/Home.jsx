import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OverviewLanding from "./components/landing/Overview";

function Home() {
  const history = useHistory();
  const { authState } = useOktaAuth();

  useEffect(() => {
    if (!authState.isPending && !authState.isAuthenticated) {
      console.log('Home useEffect, push to login')
      history.push("/login");
    }
  }, [authState]);

  if (authState.isAuthenticated) {
    return <OverviewLanding/>;
  }


  return <div>Loading...</div>;
}

export default Home;
