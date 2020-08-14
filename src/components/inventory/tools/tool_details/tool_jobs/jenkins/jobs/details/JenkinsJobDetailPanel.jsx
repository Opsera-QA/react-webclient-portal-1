import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import JenkinsJobEditorPanel from "./JenkinsJobEditorPanel";

// TODO: Implement
function JenkinsJobDetailPanel({ jenkinsJobData, setJenkinsJobData }) {
  const [tabSelection, setTabSelection] = useState("settings");

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    setTabSelection(tabSelection);
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <div className="default-custom-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (tabSelection === "settings" ? "active" : "")} onClick={handleTabClick("settings")} href="#">Settings</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {jenkinsJobData && <LdapDetailsView tabSelection={tabSelection} setJenkinsJobData={setJenkinsJobData} jenkinsJobData={jenkinsJobData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapDetailsView({ tabSelection, jenkinsJobData, setJenkinsJobData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [tabSelection]);
  if (tabSelection) {
    switch (tabSelection) {
    case "settings":
      return <JenkinsJobEditorPanel setJenkinsJobData={setJenkinsJobData} jenkinsJobData={jenkinsJobData} />;
    default:
      return null;
    }
  }
}

JenkinsJobDetailPanel.propTypes = {
  jenkinsJobData: PropTypes.object,
  setJenkinsJobData: PropTypes.func,
};

export default JenkinsJobDetailPanel;


