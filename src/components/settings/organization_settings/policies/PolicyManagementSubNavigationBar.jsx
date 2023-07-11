import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faIdBadge} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";

export default function PolicyManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "policyManagement":
        history.push(policyHelper.getManagementScreenLink());
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faIdBadge}
        tabName={"policyManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Policies"}
      />
      <NavigationTab
        icon={faIdBadge}
        tabName={"policyViewer"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Policy Viewer"}
        visible={activeTab === "policyViewer"}
      />
    </NavigationTabContainer>
  );
}

PolicyManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
