import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import OrganizationSettingsSummaryPanel
  from "components/admin/organization_settings/details/OrganizationSettingsSummaryPanel";
import CustomTab from "components/common/tabs/CustomTab";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import OrganizationSettingsPoliciesPanel
  from "components/admin/organization_settings/details/policies/OrganizationSettingsPoliciesPanel";
import {faFlag, faShieldCross} from "@fortawesome/pro-light-svg-icons";

export default function OrganizationSettingsDetailPanel(
  {
    organizationSettingsModel,
    setOrganizationSettingsModel,
  }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <CustomTab
          tabText={"Policies"}
          handleTabClick={handleTabClick}
          icon={policyHelper.getPolicyIcon()}
          activeTab={activeTab}
          tabName={"policies"}
        />
        <CustomTab
          tabText={"Feature Flags"}
          handleTabClick={handleTabClick}
          icon={faFlag}
          activeTab={activeTab}
          tabName={"featureFlags"}
        />
        <CustomTab
          tabText={"Entitlements"}
          handleTabClick={handleTabClick}
          icon={faShieldCross}
          activeTab={activeTab}
          tabName={"entitlements"}
          disabled={true}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <OrganizationSettingsSummaryPanel
            organizationSettingsModel={organizationSettingsModel}
            setOrganizationSettingsModel={setOrganizationSettingsModel}
          />
        );
      case "policies":
        return (
          <OrganizationSettingsPoliciesPanel
            organizationSettingsModel={organizationSettingsModel}
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

OrganizationSettingsDetailPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
  setOrganizationSettingsModel: PropTypes.func,
};
