import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingDialog from "./components/common/status_notifications/loading";
import Home from "./Home";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/DashboardHome";
import About from "./components/about/About";
import Pricing from "./components/about/Pricing";
import OnlineHelp from "./components/about/Help";
import Inventory from "./components/inventory/Inventory";
import Signup from "components/user/signup/Signup";
import ApiConnector from "./components/api_connector/ApiConnector";
import Pipeline from "./components/pipeline/index";
import Platform from "./components/platform/Platform";
import Analytics from "./components/analytics/Analytics";
import Logs from "./components/logs/Logs";
import Update from "./components/update/Update";
import AdminTools from "./components/admin/AdminTools";
import DeleteTools from "./components/settings/delete_tools/DeleteTools";
import RegisteredUsersManagement from "./components/admin/registered_users/RegisteredUsersManagement";
import RegisteredUserDetailView
  from "./components/admin/registered_users/registered_user_details/RegisteredUserDetailView";
import ManageSystems from "./components/admin/manage_systems/ManageSystems";
import ReportsRegistration from "./components/admin/analytics/ReportsRegistration";
import SystemStatus from "./components/admin/status/SystemStatus";
import Registration from "./components/landing/Registration";
import TagEditor from "./components/settings/tags/TagManagement";
import TagDetailView from "./components/settings/tags/tags_detail_view/TagDetailView";
import KpiManagement from "./components/admin/kpi_editor/KpiManagement";
import KpiDetailView from "./components/admin/kpi_editor/kpi_detail_view/KpiDetailView";
import TemplateManagement from "./components/admin/template_editor/TemplateManagement";
import LdapOrganizationsView from "./components/admin/accounts/ldap/organizations/LdapOrganizationManagement";
import LdapOrganizationDetailView
  from "./components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationDetailView";
import LdapCustomerOnboardView from "./components/admin/accounts/ldap/customer_onboard/LdapCustomerOnboard";
import FreeTrialRegistration from "./components/free_trial/Registration";
import FreeTrialLanding from "./components/free_trial/landing_page/Landing";
import ApiConnectionDemo from "components/admin/api_demo/ApiConnectionDemo";
import CommonTableDemo from "./components/common/samples/tableImplementation";
import CustomerSystemStatus from "./components/settings/customer_system_status/CustomerSystemStatus";
import LdapUserManagement from "./components/settings/ldap_users/LdapUserManagement";
import LdapUserDetailView from "./components/settings/ldap_users/users_detail_view/LdapUserDetailView";
import AccountSettingsView from "./components/settings/AccountSettings";
import LdapGroupManagement from "./components/settings/ldap_groups/LdapGroupManagement";
import LdapGroupDetailView from "./components/settings/ldap_groups/ldap_group_detail/LdapGroupDetailView";
import ToolDetailView from "./components/inventory/tools/tool_details/ToolDetailView";
import TemplateDetailView from "./components/admin/template_editor/template_detail_view/TemplateDetailView";
import ToolManagement from "./components/admin/tools/ToolManagement";
import DataMappingManagement from "components/settings/data_mapping/DataMappingManagement";
import ToolCategoryDetailView from "components/admin/tools/tool_category/tool_category_detail_view/ToolCategoryDetailView";
import ToolIdentifierDetailView
  from "./components/admin/tools/tool_identifier/tool_identifier_detail_view/ToolIdentifierDetailView";
import Pipelines from "./components/workflow/pipelines/Pipelines";
import PipelineDetailView from "./components/workflow/pipelines/pipeline_details/PipelineDetailView";
import ErrorDialog from "./components/common/status_notifications/error";
import LdapOrganizationAccountDetailView
  from "./components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountDetailView";
import LdapOrganizationAccountManagement
  from "./components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountManagement";
import ToastContextProvider from "./contexts/DialogToastContext";
import LdapDepartmentManagement from "./components/admin/accounts/ldap/ldap_departments/LdapDepartmentManagement";
import LdapDepartmentDetailView
  from "./components/admin/accounts/ldap/ldap_departments/department_detail_view/LdapDepartmentDetailView";
import Reports from "./components/reports/Reports";
import Reports_Old from "./components/reports/Reports_Old";
import Marketplace from "components/insights/marketplace/Marketplace";
import InsightsSummary from "components/insights/summary/InsightsSummary";
import AnalyticsProfileSettings from "./components/settings/analytics/analyticsProfileSettings";
import SiteNotificationManagement from "./components/admin/site_notifications/SiteNotificationManagement";
import SiteNotificationDetailView
  from "./components/admin/site_notifications/site_notification_detail_view/SiteNotificationDetailView";
import Notifications from "./components/notifications/Notifications";
import ToolsUsedInPipelineReport from "./components/reports/tools/pipelines/ToolsUsedInPipelineReport";
import Insights from "./components/insights/dashboards/Insights";
import DashboardDetailView from "./components/insights/dashboards/dashboard_details/DashboardDetailView";
import ProjectMappingDetailView
  from "./components/settings/data_mapping/projects/projects_detail_view/ProjectMappingDetailView";
import UsersMappingDetailView from "./components/settings/data_mapping/users/users_detail_view/UsersMappingDetailView";

import { OktaAuth } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import NotificationDetailView from "components/notifications/notification_details/NotificationDetailView";
import ToolProjectsView from "components/inventory/tools/tool_details/projects/ToolProjectsView";
import { axiosApiService } from "api/apiService";
import TagsUsedInPipelineReport from "components/reports/tags/pipelines/TagsUsedInPipelineReport";
import TagsUsedInToolsReport from "components/reports/tags/tools/TagsUsedInToolsReport";
import AccountRegistration from "components/user/account_registration/AccountRegistration";
import SiteNotificationManager from "components/admin/site_notifications/manager/SiteNotificationManager";
import ToolCountsReport from "components/reports/tools/counts/ToolCountsReport";
import UserSettings from "components/user/user_settings/UserSettings";
import AccessTokenDetailView from "components/user/user_settings/access_tokens/details/AccessTokenDetailView";
import GitComponent from "components/git/Git";
import DetailedToolReport from "./components/reports/tools/detailedReport/DetailedToolReport";
import GitTaskDetailView from "components/git/git_task_details/GitTaskDetailView";
import TagsUsedInDashboardsReport from "components/reports/tags/dashboards/TagsUsedInDashboardReport";
import OrganizationManagement from "components/settings/organizations/OrganizationManagement";
import OrganizationDetailView from "components/settings/organizations/organization_detail_view/OrganizationDetailView";
import AnalyticsDataEntryManagement from "components/settings/analytics_data_entry/AnalyticsDataEntryManagement";
import AnalyticsDataEntryDetailView
  from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryDetailView";
import Blueprint from "components/blueprint/Blueprint";
import PipelineStorageManagement from "components/admin/pipeline_storage/PipelineStorageManagement";
import PipelineStorageDetailView
  from "components/admin/pipeline_storage/pipeline_storagei_detail_view/PipelineStorageDetailView";
import ParametersInventory from "components/inventory/parameters/ParametersInventory";
import ToolInventory from "components/inventory/tools/ToolInventory";
import ScriptsInventory from "components/inventory/scripts/ScriptsInventory";
import PlatformInventory from "components/inventory/platform/platformInventory";

const AppWithRouterAccess = () => {
  const [hideSideBar, setHideSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authenticatedState, setAuthenticatedState] = useState(false);
  const [data, setData] = useState(null);

  const history = useHistory();
  const onAuthRequired = (authService) => {
    console.info("onAuthRequired being called!");
    if (authService && !authService.isAuthenticated) {
      history.push("/login");
    }
  };

  const OKTA_CONFIG = {
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
  };

  const authClient = new OktaAuth({
    issuer: OKTA_CONFIG.issuer,
    clientId: OKTA_CONFIG.client_id,
    redirectUri: OKTA_CONFIG.redirect_uri,
    responseMode: "fragment",
    tokenManager: {
      autoRenew: true,
      expireEarlySeconds: 160,
    },
  });

  authClient.tokenManager.on("expired", function(key, expiredToken) {
    console.info("Token with key", key, " has expired:");
  });

  authClient.tokenManager.on("renewed", function(key, newToken, oldToken) {
    console.info("Token with key", key, "has been renewed");
  });

  authClient.tokenManager.on("error", function(err) {
    console.error("TokenManager error:", err);
    window.location.reload(false);
    // err.name
    // err.message
    // err.errorCode
    // err.errorSummary
    // err.tokenKey
    // err.accessToken
  });


  authClient.authStateManager.subscribe(async (authState) => {
    console.info("Auth State manager subscription event: ", authState);
    setAuthenticatedState(authState.isAuthenticated);

    if (!authState.isAuthenticated) {
      setHideSideBar(true);
      setData(null);

      if (!isPublicPath(history.location.pathname)) {
        history.push("/login");
      }

      return;
    }

    if (authState.isAuthenticated && !authState.isPending && !data && !error) {
      setLoading(true);
      await loadUsersData(authState.accessToken.value);
    }

  });

  useEffect(() => {
    enableSideBar(history.location.pathname);
  }, [authenticatedState, history.location.pathname]);

  const loadUsersData = async (token) => {
    try {
      let apiUrl = "/users";
      const response = await axiosApiService(token).get(apiUrl, {});
      setData(response.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const isPublicPath = (path) => {
    return (path === "/login" ||
      path === "/signup" ||
      path === "/registration" ||
      path === "/trial/registration" ||
      path.includes("/account/registration"));
  };

  const enableSideBar = (path) => {
    if (isPublicPath(path)) {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  };

  const refreshToken = async () => {
    const tokens = authClient.tokenManager.getTokens();
    await loadUsersData(tokens.accessToken.value);
  };

  const getNavBar = () => {
    return (<Navbar hideAuthComponents={hideSideBar} userData={data} />);
  };

  /*const redirectFromLogin = async () => {
    console.log("redirectFromLogin called");
    const tokens = authClient.tokenManager.getTokens();
    await loadUsersData(tokens.accessToken.value);
    history.push("/");
  };
*/

  const getError = () => {
    if (
      error &&
      !error.message.includes("401") &&
      !error.message.includes("undefined") &&
      !error.message.includes("cancelToken")
    ) {
      return (
        <div style={{ height: "55px" }}>
          <ErrorDialog align="top" error={error}/>
        </div>
      );
    }
  };

  const getFreeTrialRoutes = () => {
    if (process.env.REACT_APP_STACK === "free-trial") {
      return (
        <>
          <Route path="/trial/registration" exact component={FreeTrialRegistration}/>
          <SecureRoute path="/trial/landing/:id?" exact component={FreeTrialLanding}/>
        </>
      );
    }
  };

  if (!data && loading && !error) {
    return (<LoadingDialog/>);
  }

  // TODO: Now that this is getting big, we should put the routes in the main screen of each area/feature
  //  and accumulate here, for instance putting all admin routes in AdminTools--
  //  This will also make it easier if we eventually allow access to different areas based on free trial/different customer levels/etc..
  return (
    <Security oktaAuth={authClient} onAuthRequired={onAuthRequired}>
      {getError()}
      <AuthContextProvider userData={data} refreshToken={refreshToken} authClient={authClient}>
        <ToastContextProvider navBar={getNavBar()}>
          <div className="container-fluid" style={{ margin: "0" }}>
            <div className="d-flex flex-row">
              <Sidebar userData={data} hideSideBar={hideSideBar}/>

                <div className="w-100 pb-4">
                  <Route path="/" exact component={Home}/>
                  <Route path='/login' render={() => <Login authClient={authClient}/>}/>
                  <Route path='/implicit/callback' component={LoginCallback}/>
                  <Route path="/logout" exact component={Logout}/>

                  <Route path="/signup" exact component={Signup}/>
                  <Route path="/about" exact component={About}/>
                  <Route path="/about/pricing" component={Pricing}/>
                  <Route path="/help" component={OnlineHelp}/>
                  <Route path="/registration" exact component={Registration}/>
                  <Route path="/account/registration/:domain" exact component={AccountRegistration}/>

                  {/* User Settings */}
                  <SecureRoute path="/user/:tab?" exact component={UserSettings}/>
                  <SecureRoute path="/user/access-tokens/details/:tokenId?" exact component={AccessTokenDetailView}/>

                  <SecureRoute path="/inventory" exact component={Inventory}/>
                  <SecureRoute path="/inventory/tools" exact component={ToolInventory}/>
                  <SecureRoute path="/inventory/platform" exact component={PlatformInventory}/>
                  <SecureRoute path="/inventory/parameters" exact component={ParametersInventory}/>
                  <SecureRoute path="/inventory/scripts" exact component={ScriptsInventory}/>
                  <SecureRoute path="/inventory/tools/details/:id/:tab?" exact component={ToolDetailView}/>
                  <SecureRoute path="/inventory/tools/details/:id/projects/:projectId" exact
                               component={ToolProjectsView}/>


                  <SecureRoute path="/dashboard" component={Dashboard}/>
                  <SecureRoute path="/tools/:id?" component={ApiConnector}/>
                  <SecureRoute path="/platform" component={Platform}/>
                  <SecureRoute path="/logs" exact component={Logs}/>
                  <SecureRoute path="/blueprint/:id?/:run?" exact component={Blueprint}/>
                  <SecureRoute path="/update" component={Update}/>

                  {/* Reports */}
                  <SecureRoute path="/reports/:tab?" exact component={Reports}/>
                  <SecureRoute path="/reports/tools/tools-used-in-pipeline" exact component={ToolsUsedInPipelineReport}/>
                  <SecureRoute path="/reports/tools/tool-counts" exact component={ToolCountsReport}/>
                  <SecureRoute path="/reports/tags/tags-used-in-pipeline" exact component={TagsUsedInPipelineReport}/>
                  <SecureRoute path="/reports/tags/tags-used-in-tools" exact component={TagsUsedInToolsReport}/>
                  <SecureRoute path="/reports/tags/tags-used-in-dashboards" exact component={TagsUsedInDashboardsReport}/>
                  <SecureRoute path="/reports/tools/detailed-tool-report" exact component={DetailedToolReport}/>

                  { /*Notifications */}
                  <SecureRoute path="/notifications" exact component={Notifications}/>
                  <SecureRoute path="/notifications/details/:id" exact component={NotificationDetailView}/>

                  {/* Insights */}
                  <SecureRoute path="/insights/analytics" exact component={Analytics}/>
                  <SecureRoute path="/insights" exact component={Insights}/>
                  <SecureRoute path="/insights/dashboards/:id/:tab?" exact component={DashboardDetailView}/>
                  <SecureRoute path="/insights/marketplace/:dashboardId?" component={Marketplace}/>
                  <SecureRoute path="/insights/synopsis" component={InsightsSummary}/>

                  {/* git tasks */}
                  <SecureRoute path="/git" exact component={GitComponent}/>
                  <SecureRoute path="/git/details/:id" exact component={GitTaskDetailView}/>

                  {/* Administration Pages */}
                  <SecureRoute path="/admin" exact component={AdminTools}/>
                  <SecureRoute path="/admin/manage_systems" component={ManageSystems}/>
                  <SecureRoute path="/admin/registered-users" exact component={RegisteredUsersManagement}/>
                  <SecureRoute path="/admin/registered-users/:id" exact component={RegisteredUserDetailView}/>
                  <SecureRoute path="/admin/system-status" component={SystemStatus}/>
                  <SecureRoute path="/admin/analytics/reports-registration" component={ReportsRegistration}/>
                  <SecureRoute path="/admin/tools/:tabKey?" exact component={ToolManagement}/>
                  <SecureRoute path="/admin/tools/types/details/:toolTypeId" exact component={ToolCategoryDetailView}/>
                  <SecureRoute path="/admin/tools/identifiers/details/:toolIdentifierId" exact
                               component={ToolIdentifierDetailView}/>
                  <SecureRoute path="/admin/kpis" exact component={KpiManagement}/>
                  <SecureRoute path="/admin/kpis/:id" exact component={KpiDetailView}/>
                  <SecureRoute path="/admin/templates" exact component={TemplateManagement}/>
                  <SecureRoute path="/admin/templates/details/:templateId" exact component={TemplateDetailView}/>
                  <SecureRoute path="/admin/reports" exact component={Reports_Old}/>
                  <SecureRoute path="/admin/pipeline-storage" exact component={PipelineStorageManagement}/>
                  <SecureRoute path="/admin/pipeline-storage/details/:id" exact component={PipelineStorageDetailView}/>

                  {/* Site Notification Management */}
                  <SecureRoute path="/admin/site-notifications/table" exact component={SiteNotificationManagement}/>
                  <SecureRoute path="/admin/site-notifications/details/:id" exact component={SiteNotificationDetailView}/>
                  <SecureRoute path="/admin/site-notifications" exact component={SiteNotificationManager}/>

                  {/* Ldap Account Pages */}
                  <SecureRoute path="/admin/organizations" exact component={LdapOrganizationsView}/>
                  <SecureRoute path="/admin/organizations/details/:organizationName" exact
                               component={LdapOrganizationDetailView}/>
                  <SecureRoute path="/admin/organization-accounts/:organizationName?" exact
                               component={LdapOrganizationAccountManagement}/>
                  <SecureRoute path="/admin/organization-accounts/:organizationDomain/details" exact
                               component={LdapOrganizationAccountDetailView}/>
                  <SecureRoute path="/accounts/create" exact component={LdapCustomerOnboardView}/>

                  <SecureRoute path="/admin/:orgDomain?/departments" exact component={LdapDepartmentManagement}/>
                  <SecureRoute path="/admin/:orgDomain/departments/details/:departmentName" exact
                               component={LdapDepartmentDetailView}/>

                  {/*Pipelines*/}
                  <SecureRoute path="/pipeline" component={Pipeline}/> {/*Old Pipeline*/}
                  <SecureRoute path="/workflow/:tab?" exact component={Pipelines}/>
                  <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView}/>

                  {/*Settings*/}
                  <SecureRoute path="/settings" exact component={AccountSettingsView}/>
                  <SecureRoute path="/settings/:orgDomain?/groups/" exact component={LdapGroupManagement}/>
                  <SecureRoute path="/settings/:orgDomain/groups/details/:groupName" exact
                               component={LdapGroupDetailView}/>
                  <SecureRoute path="/settings/organizations/" exact component={OrganizationManagement}/>
                  <SecureRoute path="/settings/organizations/details/:id" exact component={OrganizationDetailView}/>
                  <SecureRoute path="/settings/analytics-data-entries/" exact component={AnalyticsDataEntryManagement}/>
                  <SecureRoute path="/settings/analytics-data-entries/details/:id" exact component={AnalyticsDataEntryDetailView}/>
                  <SecureRoute path="/settings/:orgDomain?/users/" exact component={LdapUserManagement}/>
                  <SecureRoute path="/settings/:orgDomain/users/details/:userEmail" exact
                               component={LdapUserDetailView}/>
                  <SecureRoute path="/settings/tags" exact component={TagEditor}/>
                  <SecureRoute path="/settings/tags/:id" exact component={TagDetailView}/>
                  <SecureRoute path="/settings/customer-system-status" exact component={CustomerSystemStatus}/>
                  <SecureRoute path="/settings/analytics-profile" exact component={AnalyticsProfileSettings}/>
                  <SecureRoute path="/settings/data_mapping" exact component={DataMappingManagement}/>
                  <SecureRoute path="/settings/data_mapping/projects/details/:projectMappingId" exact
                               component={ProjectMappingDetailView}/>
                  <SecureRoute path="/settings/data_mapping/user_mapping/details/:usersMappingId" exact
                               component={UsersMappingDetailView}/>
                  <SecureRoute path="/settings/delete" component={DeleteTools}/>

                  <SecureRoute path="/admin/demo/api" component={ApiConnectionDemo}/>
                  <SecureRoute path="/demo/table" component={CommonTableDemo}/>

                  {getFreeTrialRoutes()}
                </div>
            </div>
            <div className="row fixed-row-footer-bottom">
              <div className="col text-center m-1" style={{ padding: 0, margin: 0, fontSize: ".6em" }}>
                <span>{`© ${new Date().getFullYear()} Opsera, Inc. The Continuous Orchestration Platform™`}</span>
              </div>
            </div>
          </div>
        </ToastContextProvider>
      </AuthContextProvider>
    </Security>
  );
};

export default AppWithRouterAccess;