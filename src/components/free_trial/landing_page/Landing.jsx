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
  const [activeTab, setTabSelection] = useState("welcome");

  const handleTabClick = (activeTab) => e => {
    console.log(activeTab);
    e.preventDefault();
    setTabSelection(activeTab);
  };
  
  return (
    <>
      <div className="max-content-width">
        <Row>
          <Col>
            <div className="alternate-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "welcome" ? "active" : "")} onClick={handleTabClick("welcome")} href="#">Welcome</a>
                </li>
                <li className="nav-item"> 
                  <a className={"nav-link " + (activeTab === "platform" ? "active" : "")} onClick={handleTabClick("platform")} href="#">Platform</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")} href="#">Pipeline</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "analytics" ? "active" : "")} onClick={handleTabClick("analytics")} href="#">Analytics</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <LandingView activeTab={activeTab} handleTabClick={handleTabClick}/>
          </Col>
        </Row>
      </div>
    </>
  );
}


function LandingView({ activeTab, handleTabClick }) {
  useEffect(() => {
    console.log("CHANGE HAPPENED");
  }, [activeTab, handleTabClick]);

  if (activeTab) {
    switch (activeTab) {
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