import React, { useContext, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import {useParams} from "react-router-dom";

const reportsTypes = ["tools", "pipelines", "tags"];

const extractTab = (tab) => {
  if (tab && reportsTypes.indexOf(tab) > -1) {
    return tab;
  }

  return "all";
};

function Reports() {
  const {tab} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(extractTab(tab));

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false)
    }
  }

  const getCurrentView = () => {
    switch (activeTab) {
      case "tools":
        return getToolReports();
      case "pipelines":
        return getPipelineReports();
      case "tags":
        return getTagReports();
      case "all":
      default:
        return getAllReports();
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getAllReports = () => {
    return (
      <div>
        {getTagReports()}
        {getToolReports()}
        {getPipelineReports()}
      </div>
    );
  };

  const getToolReports = () => {
    return (
      <Row className="ml-3">
        <BreadcrumbPageLink breadcrumbDestination={"toolsUsedInPipelineReport"} />
        <BreadcrumbPageLink breadcrumbDestination={"toolCountsReport"} />
      </Row>
    );
  };

  const getPipelineReports = () => {
    if (activeTab === "pipelines") {
      return (
        <Row className="ml-4">
          <span>No Pipeline Reports exist yet.</span>
        </Row>
      );
    }

  };

  const getTagReports = () => {
    return (
      <Row className="ml-3">
        <BreadcrumbPageLink breadcrumbDestination={"tagsUsedInPipelineReport"} />
        <BreadcrumbPageLink breadcrumbDestination={"tagsUsedInToolsReport"} />
      </Row>
    )
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={activeTab} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} />
        <NavigationTab activeTab={activeTab} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"tools"} />
        <NavigationTab activeTab={activeTab} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tags"} />
        <NavigationTab activeTab={activeTab} tabText={"Pipeline Reports"} handleTabClick={handleTabClick} tabName={"pipelines"} />
      </NavigationTabContainer>
    );
  };

  const getBreadcrumbDestination = () => {
    switch (activeTab) {
      case "tools":
        return "toolReports";
      case "pipelines":
        return "pipelineReports";
      case "tags":
        return "tagReports";
      case "all":
      default:
        return "reports";
    }
  }

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={getBreadcrumbDestination()}
      pageDescription={"View reports from this dashboard."}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator}
      isLoading={isLoading}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}

export default Reports;

