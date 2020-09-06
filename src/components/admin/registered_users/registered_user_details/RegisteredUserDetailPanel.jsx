import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RegisteredUserEditorPanel from "./RegisteredUserEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";

function RegisteredUserDetailPanel({ userData, setUserData, canDelete }) {
  const [activeTab, setActiveTab] = useState("settings");

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    setActiveTab(tabSelection);
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
            <div className="tabbed-content-block">
              {userData && <RegisteredUserTabView activeTab={activeTab} userData={userData} canDelete={canDelete} setUserData={setUserData} />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function RegisteredUserTabView({ activeTab, setUserData, userData, canDelete }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab, userData]);

  if (activeTab) {
    switch (activeTab) {
      case "settings":
        return <RegisteredUserEditorPanel setUserData={setUserData} userData={userData} canDelete={canDelete} />;
      default:
        return null;
    }
  }
}

RegisteredUserDetailPanel.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  canDelete: PropTypes.bool
};

export default RegisteredUserDetailPanel;


