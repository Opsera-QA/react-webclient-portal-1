import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import JenkinsJobEditorPanelV1 from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/JenkinsJobEditorPanelV1";
import CustomTabContainer from "../../../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";

// TODO: Implement
function JenkinsJobDetailPanel({ jenkinsJobData, setJenkinsJobData }) {
  const [activeTab, setTabSelection] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    console.log(activeTab);
    e.preventDefault();
    setTabSelection(activeTab);
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <CustomTabContainer>
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {jenkinsJobData && <LdapDetailsView activeTab={activeTab} setJenkinsJobData={setJenkinsJobData} jenkinsJobData={jenkinsJobData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapDetailsView({ activeTab, jenkinsJobData, setJenkinsJobData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
    case "settings":
      return <JenkinsJobEditorPanelV1 setJenkinsJobData={setJenkinsJobData} jenkinsJobData={jenkinsJobData} />;
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


