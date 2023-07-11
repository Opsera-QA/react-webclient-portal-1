import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function DeleteToolsSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (activeTab === tabSelection) {
      return;
    }

    switch (tabSelection) {
    case "deleteTools":
      history.push(`/settings/delete`);
      return;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faTimes}
        tabName={"deleteTools"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Delete Tools"}
      />
    </NavigationTabContainer>
  );
}

DeleteToolsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default DeleteToolsSubNavigationBar;
