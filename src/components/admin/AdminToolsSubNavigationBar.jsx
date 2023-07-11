import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function AdminToolsSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faTools}
        tabName={"adminTools"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Admin Tools"}
      />
    </NavigationTabContainer>
  );
}

AdminToolsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default AdminToolsSubNavigationBar;
