import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faFileArchive} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function RemoteApplicationTelemetryManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "remoteApplicationManagement":
        history.push(`/admin/remote-applications`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "telemetryViewer":
        return (
          <NavigationTab
            icon={faFileArchive}
            tabName={"telemetryViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Remote Application Telemetry Viewer"}
          />
        );
      default:
        return null;
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
        icon={faFileArchive}
        tabName={"remoteApplicationManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Remote Application Management"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

RemoteApplicationTelemetryManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default RemoteApplicationTelemetryManagementSubNavigationBar;
