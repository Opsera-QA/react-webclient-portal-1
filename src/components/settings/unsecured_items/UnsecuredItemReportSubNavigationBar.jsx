import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faArrowLeft, faShield } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function UnsecuredItemReportSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
      case "unsecuredItemReport":
        history.push(`/settings/unsecured-items`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faArrowLeft}
        tabName={"accountSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Account Settings"}
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
