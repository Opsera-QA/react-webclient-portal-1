import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faFileCode} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function CustomEnvironmentVariablesSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "customEnvironmentVariableManagement":
        history.push(`/admin/custom-environment-variables`);
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
        icon={faFileCode}
        tabName={"customEnvironmentVariableManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Custom Environment Variable Management"}
      />
    </NavigationTabContainer>
  );
}

CustomEnvironmentVariablesSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default CustomEnvironmentVariablesSubNavigationBar;
