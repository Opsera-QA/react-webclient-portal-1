import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faArrowLeft, faClipboardUser,
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function FreeTrialUserActivityReportSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
      case "freeTrialUserActivityReport":
        history.push(`/settings/trial/user/account-report`);
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
        icon={faClipboardUser}
        tabName={"freeTrialUserActivityReport"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Free Trial Activity Report"}
      />
    </NavigationTabContainer>
  );
}

FreeTrialUserActivityReportSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};