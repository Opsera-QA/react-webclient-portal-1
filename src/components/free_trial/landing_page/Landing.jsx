import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import PropTypes from "prop-types";
import FreeTrialLandingWelcome from "./tabs/welcome-tab";
import FreeTrialLandingPlatform from "./tabs/platform-tab";
import FreeTrialLandingPipeline from "./tabs/pipeline-tab";
import FreeTrialLandingAnalytics from "./tabs/analytics-tab";


function FreeTrialLanding() {
  const { id } = useParams();
  const [activeTab, setTabSelection] = useState("welcome");

  useEffect(() => {
    if (id && id.length > 0) {
      setTabSelection(id);
    } else {
      setTabSelection("welcome");
    }
  }, [id]);

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };
  
  return (
    <>
      <div className="max-content-width">
        {/*<Row>
          <Col>
            <div className="alternate-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "welcome" ? "active" : "")} onClick={handleTabClick("welcome")} href="#">Welcome</a>
                </li>
                <li className="nav-item"> 
                  <a className={"nav-link " + (activeTab === "platform" ? "active" : "")} onClick={handleTabClick("platform")} href="#">Toolchain Automation</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")} href="#">Declarative Pipeline</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "analytics" ? "active" : "")} onClick={handleTabClick("analytics")} href="#">Insights</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>*/}
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

LandingView.propTypes = {
  activeTab: PropTypes.string,
  handleTabClick: PropTypes.func,
};

export default FreeTrialLanding;