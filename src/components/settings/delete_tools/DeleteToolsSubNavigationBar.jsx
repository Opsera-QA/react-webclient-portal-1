import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faTimes} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function DeleteToolsSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
      case "deleteTools":
        history.push(`/settings/delete`);
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
