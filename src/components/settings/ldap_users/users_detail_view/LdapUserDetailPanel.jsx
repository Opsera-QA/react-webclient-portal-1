import React, { useState } from "react";
import PropTypes from "prop-types";

import LdapUserEditorPanel from "./LdapUserEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import LdapUserSummaryPanel from "./LdapUserSummaryPanel";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";

function LdapUserDetailPanel({ ldapUserData, setLdapUserData, orgDomain, authorizedActions, hideSettings }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getSettingsTab = () => {
    if (hideSettings !== true) {
      return (
        <SettingsTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          disabled={hideSettings}
        />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {getSettingsTab()}
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapUserSummaryPanel ldapUserData={ldapUserData} setActiveTab={!hideSettings ? setActiveTab : null} />;
      case "settings":
        return <LdapUserEditorPanel setLdapUserData={setLdapUserData} authorizedActions={authorizedActions} ldapUserData={ldapUserData} orgDomain={orgDomain} handleClose={toggleSummaryPanel} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

LdapUserDetailPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  hideSettings: PropTypes.bool,
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array
};

export default LdapUserDetailPanel;


