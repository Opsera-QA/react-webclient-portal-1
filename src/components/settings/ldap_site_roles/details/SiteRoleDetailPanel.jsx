import React, {useState} from "react";
import PropTypes from "prop-types";
import {faIdCard} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import LdapGroupMembershipManagementPanel
  from "components/common/inputs/user/membership/manager/LdapGroupMembershipManagementPanel";
import SiteRoleSummaryPanel from "components/settings/ldap_site_roles/details/SiteRoleSummaryPanel";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";

function SiteRoleDetailPanel({ldapGroupData, orgDomain, loadData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab
          icon={faIdCard}
          tabName={"manage"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Manage Members"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <SiteRoleSummaryPanel
            ldapGroupData={ldapGroupData}
            domain={orgDomain}
            setActiveTab={setActiveTab}
            loadData={loadData}
          />
        );
      case "manage":
        return (
          <LdapGroupMembershipManagementPanel
            orgDomain={orgDomain}
            setActiveTab={setActiveTab}
            ldapGroupData={ldapGroupData}
            loadData={loadData}
            type={"Site Role"}
          />
          );
      default:
        return null;
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

SiteRoleDetailPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  orgDomain: PropTypes.string,
  loadData: PropTypes.func,
};

export default SiteRoleDetailPanel;


