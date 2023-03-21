import React, { useState } from "react";
import PropTypes from "prop-types";
import LdapUserEditorPanel from "components/admin/accounts/ldap/users/details/LdapUserEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import LdapUserSummaryPanel from "components/admin/accounts/ldap/users/details/LdapUserSummaryPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";

export default function LdapUserDetailPanel({ ldapUserData, setLdapUserData, orgDomain, hideSettings }) {
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
        {/*{getSettingsTab()}*/}
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapUserSummaryPanel ldapUserData={ldapUserData} setActiveTab={!hideSettings ? setActiveTab : null} />;
      case "settings":
        return <LdapUserEditorPanel setLdapUserData={setLdapUserData} ldapUserData={ldapUserData} orgDomain={orgDomain} handleClose={toggleSummaryPanel} />;
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
};
