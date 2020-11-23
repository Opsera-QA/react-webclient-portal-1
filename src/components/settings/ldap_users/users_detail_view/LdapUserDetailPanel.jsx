import React, { useState } from "react";
import PropTypes from "prop-types";

import LdapUserEditorPanel from "./LdapUserEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import LdapUserSummaryPanel from "./LdapUserSummaryPanel";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";

function LdapUserDetailPanel({ ldapUserData, setLdapUserData, orgDomain, authorizedActions }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapUserSummaryPanel ldapUserData={ldapUserData} setActiveTab={setActiveTab} />;
      case "settings":
        return <LdapUserEditorPanel setLdapUserData={setLdapUserData} authorizedActions={authorizedActions} ldapUserData={ldapUserData} orgDomain={orgDomain} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

LdapUserDetailPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array
};

export default LdapUserDetailPanel;


