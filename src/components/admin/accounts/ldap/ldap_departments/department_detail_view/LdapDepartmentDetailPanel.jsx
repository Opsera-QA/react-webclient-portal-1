import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import LdapDepartmentEditorPanel from "./LdapDepartmentEditorPanel";

function LdapDepartmentDetailPanel({ ldapDepartmentData, setLdapDepartmentData, authorizedActions }) {
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
              {ldapDepartmentData && <LdapDetailsView activeTab={activeTab} authorizedActions={authorizedActions} setLdapDepartmentData={setLdapDepartmentData} ldapDepartmentData={ldapDepartmentData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapDetailsView({ activeTab, setLdapDepartmentData, ldapDepartmentData, authorizedActions }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
    case "settings":
      return <LdapDepartmentEditorPanel setLdapDepartmentData={setLdapDepartmentData} authorizedActions={authorizedActions} ldapDepartmentData={ldapDepartmentData} />;
    default:
      return null;
    }
  }
}

LdapDepartmentDetailPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  setLdapDepartmentData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapDepartmentDetailPanel;


