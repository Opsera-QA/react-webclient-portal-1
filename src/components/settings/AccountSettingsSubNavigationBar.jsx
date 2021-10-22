import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function AccountSettingsSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faCogs}
        tabName={"accountSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Account Settings"}
      />
    </NavigationTabContainer>
  );
}

AccountSettingsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default AccountSettingsSubNavigationBar;
