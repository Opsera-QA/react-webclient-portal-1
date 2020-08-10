import React, {useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./LdapGroupEditorPanel";
import LdapGroupManagePanel from "./LdapGroupManagePanel";
import LdapUsersTable from "../../ldap_users/LdapUsersTable";

function LdapGroupDetailPanel({ ldapGroupDto, currentUserEmail, ldapGroupData, setLdapGroupData, ldapOrganizationData, orgDomain, loadData }) {
  const [activeTab, setActiveTab] = useState("membership");

  const handleTabClick = (tabSelection) => e => {
    console.log(tabSelection);
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col lg={12}>
            <div className="default-custom-tabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "membership" ? "active" : "")} href="#"
                     onClick={handleTabClick("membership")}>Membership</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "manage" ? "active" : "")} href="#"
                     onClick={handleTabClick("manage")}>Manage</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + (activeTab === "settings" ? "active" : "")}
                     onClick={handleTabClick("settings")}>Settings</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={12}>
            <div className="tabbed-content-block detail-view-detail-panel">
              {ldapGroupData &&
              <LdapGroupDetailsView currentUserEmail={currentUserEmail} ldapGroupData={ldapGroupData} orgDomain={orgDomain} setLdapGroupData={setLdapGroupData} loadData={loadData} activeTab={activeTab} ldapOrganizationData={ldapOrganizationData}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapGroupDetailsView({activeTab, currentUserEmail, ldapGroupData, orgDomain, setLdapGroupData, ldapOrganizationData, loadData}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "membership":
        return <LdapUsersTable orgDomain={orgDomain} userData={ldapGroupData.members} />;
      case "manage":
        return <LdapGroupManagePanel ldapGroupData={ldapGroupData.data} ldapOrganizationData={ldapOrganizationData} loadData={loadData}/>;
      case "settings":
        return <LdapGroupEditorPanel currentUserEmail={currentUserEmail} setLdapGroupData={setLdapGroupData} ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData} />;
      default:
        return null;
    }
  }
}

LdapGroupDetailPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  setLdapGroupData: PropTypes.func,
  ldapOrganizationData: PropTypes.object,
  orgDomain: PropTypes.string,
  currentUserEmail: PropTypes.string,
  loadData: PropTypes.func
};

export default LdapGroupDetailPanel;


