import React, {useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./LdapGroupEditorPanel";
import LdapGroupManagePanel from "./LdapGroupManagePanel";
import LdapUsersTable from "../../ldap_users/LdapUsersTable";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import {faIdCard, faUsers} from "@fortawesome/pro-solid-svg-icons";

function LdapGroupDetailPanel({ currentUserEmail, ldapGroupData, setLdapGroupData, ldapOrganizationData, orgDomain, loadData, authorizedActions }) {
  const [activeTab, setActiveTab] = useState("membership");

  const handleTabClick = (activeTab) => e => {
    console.log(activeTab);
    e.preventDefault();
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <CustomTabContainer>
              <CustomTab icon={faUsers} tabName={"membership"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Membership"} />
              <CustomTab icon={faIdCard} tabName={"manage"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Manage"} />
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shaded-panel detail-view-detail-panel">
              {ldapGroupData &&
              <LdapGroupDetailsView currentUserEmail={currentUserEmail} ldapGroupData={ldapGroupData} authorizedActions={authorizedActions} orgDomain={orgDomain} setLdapGroupData={setLdapGroupData} loadData={loadData} activeTab={activeTab} ldapOrganizationData={ldapOrganizationData}/>}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapGroupDetailsView({activeTab, currentUserEmail, authorizedActions, ldapGroupData, orgDomain, setLdapGroupData, ldapOrganizationData, loadData}) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      case "membership":
        return (<div className="px-3 pt-2 pb-3"><LdapUsersTable orgDomain={orgDomain} userData={ldapGroupData.members} /></div>);
      case "manage":
        return (<LdapGroupManagePanel ldapGroupData={ldapGroupData.data} authorizedActions={authorizedActions} ldapOrganizationData={ldapOrganizationData} loadData={loadData}/>);
      case "settings":
        return <LdapGroupEditorPanel currentUserEmail={currentUserEmail} authorizedActions={authorizedActions} setLdapGroupData={setLdapGroupData} ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData} />;
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
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapGroupDetailPanel;


