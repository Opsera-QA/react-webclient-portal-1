import React, { useState } from "react";
import PropTypes from "prop-types";

import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import LdapDepartmentEditorPanel from "./LdapDepartmentEditorPanel";
import {faUsers} from "@fortawesome/pro-light-svg-icons";
import LdapDepartmentSummaryPanel from "./LdapDepartmentSummaryPanel";
import SummaryTab from "../../../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../../../common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "../../../../../common/panels/detail_view/DetailTabPanelContainer";
import LdapDepartmentMembershipPanel from "./LdapDepartmentMembershipPanel";

function LdapDepartmentDetailPanel({ ldapDepartmentData, loadData, setLdapDepartmentData, ldapDepartmentGroupData, orgDomain, authorizedActions }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faUsers} tabName={"membership"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Membership"} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapDepartmentSummaryPanel ldapDepartmentData={ldapDepartmentData} setActiveTab={setActiveTab} />;
      case "membership":
        return (
          <LdapDepartmentMembershipPanel
            ldapDepartmentData={ldapDepartmentData}
            ldapDepartmentGroupData={ldapDepartmentGroupData}
            orgDomain={orgDomain}
          />
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


