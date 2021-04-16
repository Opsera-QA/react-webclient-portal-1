import React, { useContext, useState, useEffect } from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {useHistory, useParams} from "react-router-dom";
import ToolReports from "components/reports/tools/ToolReports";
import TagReports from "components/reports/tags/TagReports";
import PipelineReports from "components/reports/pipelines/PipelineReports";
import {faAnalytics, faDraftingCompass, faTags, faTools} from "@fortawesome/pro-light-svg-icons";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

const reportsTypes = ["tools", "pipelines", "tags"];

const extractTab = (tab) => {
  if (tab && reportsTypes.indexOf(tab) > -1) {
    return tab;
  }

  return "all";
};

function Reports() {
  const {tab} = useParams();
  let history = useHistory();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(extractTab(tab));

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection !== activeTab) {
      history.push(`/reports/${tabSelection}`);
      setActiveTab(tabSelection);
    }
  };

  useEffect(() => {
    if (tab == null) {
      history.push(`/reports/all`);
    }

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
      setIsLoading(false);
    }
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "tools":
        return <ToolReports />;
      case "pipelines":
        return <PipelineReports />;
      case "tags":
        return <TagReports />;
      case "all":
      default:
        return getAllReports();
    }
  };

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
        <TagReports />
        <ToolReports />
        {/*TODO: Uncomment when Pipeline Report is added*/}
        {/*<PipelineReports />*/}
      </div>
    );
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={activeTab} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} icon={faAnalytics} />
        <NavigationTab activeTab={activeTab} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"tools"} icon={faTools} />
        <NavigationTab activeTab={activeTab} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tags"} icon={faTags} />
        {/* <NavigationTab activeTab={activeTab} tabText={"Pipeline Reports"} handleTabClick={handleTabClick} tabName={"pipelines"} icon={faDraftingCompass} /> */}
        {/*<NavigationTab activeTab={activeTab} tabText={"Dashboard Reports"} handleTabClick={handleTabClick} tabName={"dashboards"} icon={faDraftingCompass} />*/}
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
      case "dashboards":
        return "dashboardReports";
      case "all":
      default:
        return "reports";
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={getBreadcrumbDestination()}
      pageDescription={"View reports from this dashboard."}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
      isLoading={isLoading}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}

export default Reports;

