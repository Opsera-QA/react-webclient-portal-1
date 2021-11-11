import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function KpiIdentifierManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "kpiIdentifierManagement":
        history.push(`/admin/kpis`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "kpiIdentifierViewer":
        return (
          <NavigationTab
            icon={faFileInvoice}
            tabName={"kpiIdentifierViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"KPI Identifier Viewer"}
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
        icon={faFileInvoice}
        tabName={"kpiIdentifierManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"KPI Identifier Management"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

KpiIdentifierManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default KpiIdentifierManagementSubNavigationBar;
