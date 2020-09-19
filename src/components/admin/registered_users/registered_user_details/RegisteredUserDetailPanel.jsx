import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AnalyticsProfileEditorPanel from "./analytics_profile/AnalyticsProfileEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faClipboardList, faDatabase, faCogs} from "@fortawesome/pro-solid-svg-icons";
import CustomerDatabaseEditorPanel from "./customer_database/CustomerDatabaseEditorPanel";
import RegisteredUserToolsPanel from "./tools/RegisteredUserToolsPanel";

function RegisteredUserDetailPanel({ userData, setUserData, analyticsProfileData, setAnalyticsProfileData }) {
  const [activeTab, setActiveTab] = useState("analyticsSettings");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <CustomTabContainer>
              <CustomTab icon={faDatabase} tabName={"customerDB"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Customer DB"} />
              <CustomTab icon={faCogs} tabName={"analyticsSettings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Analytics Profile"} />
              {/*<CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />*/}
              <CustomTab icon={faClipboardList} tabName={"tools"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Tools"} />
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block">
              {userData && <RegisteredUserTabView activeTab={activeTab} analyticsProfileData={analyticsProfileData} setAnalyticsProfileData={setAnalyticsProfileData} userData={userData} setUserData={setUserData} />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function RegisteredUserTabView({ activeTab, userData, setUserData, analyticsProfileData, setAnalyticsProfileData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab, analyticsProfileData, userData]);

  if (activeTab) {
    switch (activeTab) {
      case "tools":
        return <RegisteredUserToolsPanel registeredUserId={userData["_id"]} />
      case "customerDB":
        return <CustomerDatabaseEditorPanel customerDatabaseData={analyticsProfileData} setCustomerDatabaseData={setAnalyticsProfileData} />;
      case "analyticsSettings":
        return <AnalyticsProfileEditorPanel setAnalyticsProfileData={setAnalyticsProfileData} analyticsProfileData={analyticsProfileData} />;
      case "settings":
        return <AnalyticsProfileEditorPanel setAnalyticsProfileData={setAnalyticsProfileData} analyticsProfileData={analyticsProfileData} />;
      default:
        return null;
    }
  }
}

RegisteredUserDetailPanel.propTypes = {
  analyticsProfileData: PropTypes.object,
  setAnalyticsProfileData: PropTypes.func,
  userData: PropTypes.object,
  setUserData: PropTypes.func
};

export default RegisteredUserDetailPanel;


