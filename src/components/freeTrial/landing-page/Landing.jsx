// This will be the landing page built based on OC-168.  
// the content below is just copied from another landing page, so it needs to be updated to match new requirements.

import React from "react";
import {Row, Col, Tabs, Tab, Button} from "react-bootstrap";

import "../freeTrial.css";
import FreeTrialLandingWelcome from "./tabs/welcome-tab";
import FreeTrialLandingPlatform from "./tabs/platform-tab";
import FreeTrialLandingPipeline from "./tabs/pipeline-tab";
import FreeTrialLandingAnalytics from "./tabs/analytics-tab";

function FreeTrialLanding() {
  
  
  return (
    <>
      <div className="max-content-width">
        <Tabs defaultActiveKey="welcome" id="uncontrolled-tab-example">
          <Tab eventKey="welcome" title="Welcome!">
            <FreeTrialLandingWelcome />
          </Tab>
          <Tab eventKey="platform" title="Platform">
            <FreeTrialLandingPlatform />
          </Tab>
          <Tab eventKey="pipeline" title="Pipeline">
            <FreeTrialLandingPipeline />
          </Tab>
          <Tab eventKey="analytics" title="Analytics">
            <FreeTrialLandingAnalytics />
          </Tab>
        </Tabs>
      </div>
    </>
  );
  // } 

}

export default FreeTrialLanding;