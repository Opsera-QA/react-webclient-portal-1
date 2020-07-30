// This will be the landing page built based on OC-168.  
// the content below is just copied from another landing page, so it needs to be updated to match new requirements.

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import "../freeTrial.css";
import FreeTrialLandingWelcome from "./tabs/welcome-tab";
import FreeTrialLandingPlatform from "./tabs/platform-tab";
import FreeTrialLandingPipeline from "./tabs/pipeline-tab";
import FreeTrialLandingAnalytics from "./tabs/analytics-tab";

function FreeTrialLanding() {
  const [tabSelection, setTabSelection] = useState("welcome");

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    setTabSelection(tabSelection);
  };
  
  return (
    <>
      <div className="max-content-width">
        <Row>
          <Col>
            <div className="alternate-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (tabSelection === "welcome" ? "active" : "")} onClick={handleTabClick("welcome")} href="#">Welcome</a>
                </li>
                <li className="nav-item"> 
                  <a className={"nav-link " + (tabSelection === "platform" ? "active" : "")} onClick={handleTabClick("platform")} href="#">Platform</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (tabSelection === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")} href="#">Pipeline</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (tabSelection === "analytics" ? "active" : "")} onClick={handleTabClick("analytics")} href="#">Analytics</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <LandingView tabSelection={tabSelection} handleTabClick={handleTabClick}/>
          </Col>
        </Row>
      </div>
    </>
  );
}


function LandingView({ tabSelection, handleTabClick }) {
  useEffect(() => {
    console.log("CHANGE HAPPENED");
  }, [tabSelection, handleTabClick]);

  if (tabSelection) {
    switch (tabSelection) {
    case "welcome":
      return <FreeTrialLandingWelcome handleTabClick={handleTabClick}/>;
    case "platform":
      return <FreeTrialLandingPlatform/>;
    case "pipeline":
      return <FreeTrialLandingPipeline/>;
    case "analytics":
      return <FreeTrialLandingAnalytics/>;
    default:
      return null;
    }
  }
}

export default FreeTrialLanding;