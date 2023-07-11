import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faLink} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function ApiConnectionDemoSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "apiConnectionTest":
        history.push(`/admin/demo/api`);
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
        icon={faLink}
        tabName={"apiConnectionTest"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"API Connection Test"}
      />
    </NavigationTabContainer>
  );
}

ApiConnectionDemoSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default ApiConnectionDemoSubNavigationBar;
