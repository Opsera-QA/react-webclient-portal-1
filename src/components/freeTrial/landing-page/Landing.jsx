// This will be the landing page built based on OC-168.  
// the content below is just copied from another landing page, so it needs to be updated to match new requirements.

import React from "react";
import { Tabs, Tab } from "react-bootstrap";

import "../freeTrial.css";
import FreeTrialLandingWelcome from "./tabs/welcome-tab";
import FreeTrialLandingPlatform from "./tabs/platform-tab";
import FreeTrialLandingPipeline from "./tabs/pipeline-tab";
import FreeTrialLandingAnalytics from "./tabs/analytics-tab";

function FreeTrialLanding() {

  const selectTab = (tabId) => {
    console.log("tabId: " + tabId);
    document.getElementById(tabId).click();
  };
  
  return (
    <>
      <div className="max-content-width">
        <div className="free-trial-tabs">
          <Tabs id="free-trial-tabs" defaultActiveKey="welcome">
            <Tab id="welcome" eventKey="welcome" title="Welcome!">
              <FreeTrialLandingWelcome setActiveTab={selectTab} />
            </Tab>
            <Tab id="platform" eventKey="platform" title="Platform">
              <FreeTrialLandingPlatform />
            </Tab>
            <Tab id="pipeline" eventKey="pipeline" title="Pipeline">
              <FreeTrialLandingPipeline />
            </Tab>
            <Tab id="analytics" eventKey="analytics" title="Analytics">
              <FreeTrialLandingAnalytics />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
  // } 

}

export default FreeTrialLanding;