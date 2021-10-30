import React, { useState } from "react";
import PropTypes from "prop-types";

import {faUsers} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CustomTab from "components/common/tabs/CustomTab";
import LdapDepartmentSummaryPanel
  from "components/settings/ldap_departments/details/LdapDepartmentSummaryPanel";
import LdapDepartmentMembershipPanel
  from "components/settings/ldap_departments/details/LdapDepartmentMembershipPanel";
import LdapDepartmentEditorPanel
  from "components/settings/ldap_departments/details/LdapDepartmentEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function LdapDepartmentDetailPanel({ ldapDepartmentData, loadData, setLdapDepartmentData, ldapDepartmentGroupData, orgDomain }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };


  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faUsers} tabName={"membership"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Membership"} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <LdapDepartmentSummaryPanel
            ldapDepartmentData={ldapDepartmentData}
            setActiveTab={setActiveTab}
            orgDomain={orgDomain}
          />
        );
      case "membership":
        // TODO: Rework department membership panel and hook up here
        return (
          <LdapDepartmentMembershipPanel
            ldapDepartmentData={ldapDepartmentData}
            ldapDepartmentGroupData={ldapDepartmentGroupData}
            orgDomain={orgDomain}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <LdapDepartmentEditorPanel
            setLdapDepartmentData={setLdapDepartmentData}
            orgDomain={orgDomain}
            ldapDepartmentData={ldapDepartmentData}
            reloadData={loadData}
            handleClose={toggleSummaryPanel}
          />
        );
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

LdapDepartmentDetailPanel.propTypes = {
  ldapDepartmentGroupData: PropTypes.object,
  ldapDepartmentData: PropTypes.object,
  setLdapDepartmentData: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array,
  orgDomain: PropTypes.string
};

export default LdapDepartmentDetailPanel;


