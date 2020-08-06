import React, {useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import LdapUsersTable from "../../ldap_users/LdapUsersTable";
import LdapGroupEditorPanel from "./LdapGroupEditorPanel";
import LdapGroupManagePanel from "./LdapGroupManagePanel";

function LdapGroupDetailPanel({ ldapGroupData, setLdapGroupData, ldapOrganizationData, loadData }) {
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
            <div className="tabbed-content-block">
              {ldapGroupData &&
              <LdapGroupDetailsView ldapGroupData={ldapGroupData} setLdapGroupData={setLdapGroupData} loadData={loadData} activeTab={activeTab} ldapOrganizationData={ldapOrganizationData}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapGroupDetailsView({activeTab, ldapGroupData, setLdapGroupData, ldapOrganizationData, loadData}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "membership":
        return <LdapUsersTable data={ldapGroupData.members} />;
      case "manage":
        return <LdapGroupManagePanel ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData} loadData={loadData}/>;
      case "settings":
        return <LdapGroupEditorPanel ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData} onGroupUpdate={(data) => setLdapGroupData(data)} />;
      default:
        return null;
    }
  }
}

LdapGroupDetailPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  setLdapGroupData: PropTypes.func,
  ldapOrganizationData: PropTypes.object,
  loadData: PropTypes.func
};

export default LdapGroupDetailPanel;


