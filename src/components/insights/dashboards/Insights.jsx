import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import {useHistory} from "react-router-dom";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import dashboardFilterMetadata from "components/insights/dashboards/dashboard-filter-metadata";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import DashboardsTable from "components/insights/dashboards/DashboardsTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AnalyticsProfileSettings from "components/settings/analytics/activateAnalyticsCard";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faChartNetwork, faChartArea, faRadar} from "@fortawesome/pro-light-svg-icons";

function Insights() {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const history = useHistory();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardsList, setDashboardsList] = useState(undefined);
  const [dashboardFilterDto, setDashboardFilterDto] = useState(new Model({...dashboardFilterMetadata.newObjectFields}, dashboardFilterMetadata, false));
  const toastContext = useContext(DialogToastContext);
  const [profile, setProfile] = useState(undefined);
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("dashboards");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(dashboardFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto, cancelSource);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getProfile = async(filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    let settings = await analyticsActions.fetchProfileV2(getAccessToken, cancelSource);

    if (isMounted.current === true) {
      setProfile(settings?.data);

      if (settings?.data?.enabledToolsOn) {
        await getDashboards(filterDto, cancelSource);
      }
    }
  };

  const getDashboards = async (filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getAllDashboardsV2(getAccessToken, cancelSource, filterDto);
    const dashboards = response?.data?.data;

    if (isMounted.current === true && dashboards) {
      setDashboardsList(dashboards);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setDashboardFilterDto({...newFilterDto});
    }
  };

  const getRoles = async (filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getProfile(filterDto, cancelSource);
    }
  };

  const getInsightsView = () => {
    if (!profile) {
      return (<LoadingDialog size="sm" message="Loading Insights"/>);
    }

    if (profile?.enabledToolsOn) {
      return (
        <DashboardsTable
          data={dashboardsList}
          loadData={loadData}
          isLoading={isLoading}
          dashboardFilterDto={dashboardFilterDto}
          setDashboardFilterDto={setDashboardFilterDto}
          dashboardsActions={dashboardsActions}
        />
      );
    }

    return (
      <div className="mt-1 max-content-width mb-1">
        <AnalyticsProfileSettings />
      </div>
    );
  };

  const handleNavTabClick = (tabSelection) => async e => {
    e.preventDefault();

    if (tabSelection === "analytics") {
      history.push(`/analytics`);
      return;
    }

    if (tabSelection === "marketplace") {
      history.push(`/insights/marketplace`);
      return;
    }

    if (tabSelection === "dashboards") {
      history.push(`/insights/dashboards`);
      return;
    }

    if (tabSelection === "synopsis") {
      history.push(`/insights/synopsis`);
      return;
    }

    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faChartNetwork} tabName={"dashboards"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Dashboards"} />
        <NavigationTab icon={faChartArea} tabName={"marketplace"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Marketplace"} />
        <NavigationTab icon={faAnalytics} tabName={"analytics"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Analytics"} />
        <NavigationTab icon={faRadar} tabName={"synopsis"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Synopsis"} />
      </NavigationTabContainer>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Insights"/>);
  }

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      pageDescription={`
        Opsera provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the Opsera Analytics Platform or search your currently
        configured logs repositories below.
      `}
      breadcrumbDestination={"insights"}
    >
      {getInsightsView()}
    </ScreenContainer>
  );

}


export default Insights;