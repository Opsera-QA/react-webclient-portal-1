import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import LdapDepartmentEditorPanel from "./LdapDepartmentEditorPanel";
import {faIdCard, faUsers} from "@fortawesome/pro-solid-svg-icons";
import LdapUsersTable from "../../../../../settings/ldap_users/LdapUsersTable";
import LdapGroupManagePanel from "../../../../../settings/ldap_groups/ldap_group_detail/LdapGroupManagePanel";
import LdapGroupsTable from "../../../../../settings/ldap_groups/LdapGroupsTable";

function LdapDepartmentDetailPanel({ ldapDepartmentData, loadData, setLdapDepartmentData, ldapDepartmentGroupData, orgDomain, authorizedActions }) {
  const [activeTab, setActiveTab] = useState("membership");

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
              <CustomTab icon={faUsers} tabName={"membership"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Membership"} />
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="shaded-panel detail-view-detail-panel">
              {ldapDepartmentData &&
                <LdapDetailsView
                  activeTab={activeTab}
                  orgDomain={orgDomain}
                  authorizedActions={authorizedActions}
                  setLdapDepartmentData={setLdapDepartmentData}
                  ldapDepartmentData={ldapDepartmentData}
                  ldapDepartmentGroupData={ldapDepartmentGroupData}
                  loadData={loadData}
                />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LdapDetailsView({ activeTab, setLdapDepartmentData, ldapDepartmentData, ldapDepartmentGroupData, orgDomain, loadData, authorizedActions }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
      // TODO: Make a component for this
      case "membership":
        return (
          <div className="px-3 pt-2 pb-3">
            <LdapGroupsTable orgDomain={orgDomain} groupData={[ldapDepartmentGroupData]} />
            <div className={"mt-3"}><LdapUsersTable orgDomain={orgDomain} userData={ldapDepartmentData.members} /></div>
          </div>
        );
    case "settings":
      return (
        <LdapDepartmentEditorPanel
          setLdapDepartmentData={setLdapDepartmentData}
          authorizedActions={authorizedActions}
          orgDomain={orgDomain}
          ldapDepartmentData={ldapDepartmentData}
          reloadData={loadData}
        />
        );
    default:
      return null;
    }
  }
}

LdapDepartmentDetailPanel.propTypes = {
  ldapDepartmentGroupData: PropTypes.object,
  ldapDepartmentData: PropTypes.object,
  setLdapDepartmentData: PropTypes.func,
  authorizedActions: PropTypes.array,
  orgDomain: PropTypes.string
};

export default LdapDepartmentDetailPanel;


