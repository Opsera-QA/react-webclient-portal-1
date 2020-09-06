import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LdapUserEditorPanel from "./LdapUserEditorPanel";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import CustomTab from "../../../common/tabs/CustomTab";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";

function LdapUserDetailPanel({ ldapUserData, setLdapUserData, orgDomain }) {
  const [activeTab, setActiveTab] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
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
              {ldapUserData && <LdapDetailsView activeTab={activeTab} setLdapUserData={setLdapUserData} ldapUserData={ldapUserData} orgDomain={orgDomain} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapDetailsView({ activeTab, setLdapUserData, ldapUserData, orgDomain }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
    case "settings":
      return <LdapUserEditorPanel setLdapUserData={setLdapUserData} ldapUserData={ldapUserData} orgDomain={orgDomain} />;
    default:
      return null;
    }
  }
}

LdapUserDetailPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  orgDomain: PropTypes.string
};

export default LdapUserDetailPanel;


