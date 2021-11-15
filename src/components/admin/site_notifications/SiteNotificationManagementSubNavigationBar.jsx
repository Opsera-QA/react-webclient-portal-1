import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faFlag} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function SiteNotificationManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "siteNotificationManager":
        history.push(`/admin/site-notifications`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faArrowLeft}
        tabName={"adminTools"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Admin Tools"}
      />
      <NavigationTab
        icon={faFlag}
        tabName={"siteNotificationManager"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Site Notification Manager"}
      />
    </NavigationTabContainer>
  );
}

SiteNotificationManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default SiteNotificationManagementSubNavigationBar;
