import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faShield } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

export default function UnsecuredItemReportSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "unsecuredItemReport":
        history.push(`/settings/unsecured-items`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faShield}
        tabName={"unsecuredItemReport"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Unsecured Item Report"}
      />
    </NavigationTabContainer>
  );
}

UnsecuredItemReportSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
