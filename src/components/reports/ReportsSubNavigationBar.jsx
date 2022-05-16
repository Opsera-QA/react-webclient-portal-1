import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faAnalytics,
  faTags,
  faTools,
  faUsers
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";

function ReportsSubNavigationBar({currentTab}) {
  const history = useHistory();
  const { isSassUser } = useContext(AuthContext);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "toolReports":
        history.push(`/reports/tools`);
        return;
      case "pipelineReports":
        history.push(`/reports/pipelines`);
        return;
      case "tagReports":
        history.push(`/reports/tags`);
        return;
      case "userReports":
        history.push(`/reports/users`);
        return;
      case "all":
        history.push(`/reports`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (currentTab) {
      case "toolReportViewer":
        return (
          <NavigationTab
            icon={faTools}
            tabName={currentTab}
            handleTabClick={handleTabClick}
            activeTab={"toolReportViewer"}
            tabText={"Tool Report Viewer"}
          />
        );
      case "tagReportViewer":
        return (
          <NavigationTab
            icon={faTags}
            tabName={currentTab}
            handleTabClick={handleTabClick}
            activeTab={"tagReportViewer"}
            tabText={"Tag Report Viewer"}
          />
        );
      case "userReportViewer":
        return (
          <NavigationTab
            icon={faUsers}
            tabName={currentTab}
            handleTabClick={handleTabClick}
            activeTab={"userReportViewer"}
            tabText={"User Report Viewer"}
          />
        );
      default:
        return null;
    }
  };

  const getDynamicUserTab = () => {
    if (isSassUser() === false) {
      return (
        <NavigationTab
          activeTab={currentTab}
          tabText={"User Reports"}
          handleTabClick={handleTabClick}
          tabName={"userReports"}
          icon={faUsers}
        />
      );
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab activeTab={currentTab} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} icon={faAnalytics} />
      <NavigationTab activeTab={currentTab} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tagReports"} icon={faTags} />
      <NavigationTab activeTab={currentTab} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"toolReports"} icon={faTools} />
      {getDynamicUserTab()}
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

ReportsSubNavigationBar.propTypes = {
  currentTab: PropTypes.string,
};

export default ReportsSubNavigationBar;
