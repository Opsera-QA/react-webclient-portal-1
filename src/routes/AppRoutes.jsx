import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Router, Switch, useHistory } from "react-router-dom";
import { SecureRoute } from "@okta/okta-react";
import Sidebar from "components/sidebar/Sidebar";
import Dashboard from "components/dashboard/DashboardHome";
import ApiConnector from "components/api_connector/ApiConnector";
import Pipeline from "components/pipeline";
import Logs from "components/logs/Logs";
import Update from "components/update/Update";
import TagEditor from "components/settings/tags/TagManagement";
import TagDetailView from "components/settings/tags/tags_detail_view/TagDetailView";
import AccountSettingsView from "components/settings/AccountSettings";
import LdapGroupManagement from "components/settings/ldap_groups/LdapGroupManagement";
import LdapGroupDetailView from "components/settings/ldap_groups/details/LdapGroupDetailView";
import DataMappingManagement from "components/settings/data_mapping/DataMappingManagement";
import Pipelines from "components/workflow/pipelines/Pipelines";
import PipelineDetailView from "components/workflow/pipelines/pipeline_details/PipelineDetailView";
import LdapDepartmentManagement from "components/settings/ldap_departments/LdapDepartmentManagement";
import LdapDepartmentDetailView
  from "components/settings/ldap_departments/details/LdapDepartmentDetailView";
import AnalyticsProfileSettings from "components/settings/analytics/analyticsProfileSettings";
import NotificationPolicyManagement from "components/notifications/NotificationPolicyManagement";
import ProjectDataMappingDetailView
  from "components/settings/data_mapping/projects/details/ProjectDataMappingDetailView";
import UserDataMappingDetailView from "components/settings/data_mapping/users/details/UserDataMappingDetailView";
import NotificationDetailView from "components/notifications/notification_details/NotificationDetailView";
import UserSettings from "components/user/user_settings/UserSettings";
import AccessTokenDetailView from "components/user/user_settings/access_tokens/details/AccessTokenDetailView";
import TaskDetailView from "components/tasks/details/TaskDetailView";
import OrganizationManagement from "components/settings/organizations/OrganizationManagement";
import OrganizationDetailView from "components/settings/organizations/organization_detail_view/OrganizationDetailView";
import AnalyticsDataEntryManagement from "components/settings/analytics_data_entry/AnalyticsDataEntryManagement";
import AnalyticsDataEntryDetailView
  from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryDetailView";
import Blueprint from "components/blueprint/Blueprint";
import DeleteTools from "components/settings/delete_tools/DeleteTools";
import TaskManagement from "components/tasks/TaskManagement";
import TaskAllActivityPanel from "components/tasks/activity_logs/TaskAllActivityPanel";
import UserManagement from "components/settings/users/UserManagement";
import UserDetailView from "components/settings/users/details/UserDetailView";
import SsoUserDetailView from "components/settings/users/sso_user_details/SsoUserDetailView";
import PipelineCatalogLibrary from "components/workflow/catalog/PipelineCatalogLibrary";
import SiteRoleManagement from "components/settings/ldap_site_roles/SiteRoleManagement";
import SiteRoleDetailView from "components/settings/ldap_site_roles/details/SiteRoleDetailView";
import NotificationPoliciesActivityLogs from "components/notifications/NotificationPoliciesActivityLogs";
import PipelineDataMappingDetailView
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingDetailView";
import LogsBackupManagement from "components/settings/logs_backup/LogsBackupManagement";
import OpseraFooter from "components/footer/OpseraFooter";
import AdminToolsRoutes from "routes/AdminToolsRoutes";
import ToolchainRoutes from "routes/ToolchainRoutes";
import PublicRoutes from "routes/PublicRoutes";
import ReportsRoutes from "routes/ReportsRoutes";
import RegistryRoutes from "routes/RegistryRoutes";
import InsightsRoutes from "routes/InsightsRoutes";

const AppRoutes = ({ authenticatedState, isPublicPathState, authClient, userData, hideSideBar }) => {
  const history = useHistory();

  useEffect(() => {}, [userData, authenticatedState, isPublicPathState, hideSideBar]);

  // Authenticated routes
  return (
    <div className={"container-fluid m-0"}>
      <div className={"d-flex flex-row"}>
        <Sidebar userData={userData} hideSideBar={hideSideBar} />

        <div className={"w-100 hide-x-overflow"} style={{ marginBottom: "26px" }}>
          {/*<Router history={history}>*/}
          {/*  <Switch>*/}
              <PublicRoutes
                authClient={authClient}
              />
              <SecureRoute path="/user/:tab?" exact component={UserSettings} />
              <SecureRoute path="/user/access-tokens/details/:tokenId?" exact component={AccessTokenDetailView} />

              <RegistryRoutes />
              <ToolchainRoutes />


          <SecureRoute path="/logs" exact component={Logs} />
          <SecureRoute path="/blueprint/:id?/:run?" exact component={Blueprint} />

              <ReportsRoutes
              />

              <SecureRoute path="/notifications" exact component={NotificationPolicyManagement} />
              <SecureRoute path="/notifications/activity" exact component={NotificationPoliciesActivityLogs} />
              <SecureRoute path="/notifications/details/:id" exact component={NotificationDetailView} />

              <InsightsRoutes />

              <SecureRoute path="/task" exact component={TaskManagement} />
              <SecureRoute path="/task/activity" exact component={TaskAllActivityPanel} />
              <SecureRoute path="/task/details/:id" exact component={TaskDetailView} />

              <AdminToolsRoutes />

              <SecureRoute path="/pipeline" component={Pipeline} />
              <SecureRoute path="/workflow/catalog/library" exact component={PipelineCatalogLibrary} />
              <SecureRoute path="/workflow/:tab?" exact component={Pipelines} />
              <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView} />


              <SecureRoute path="/settings" exact component={AccountSettingsView} />
              <SecureRoute path="/settings/delete" component={DeleteTools} />
              <SecureRoute path="/settings/:orgDomain?/groups/" exact component={LdapGroupManagement} />
              <SecureRoute path="/settings/:orgDomain/groups/details/:groupName" exact
                           component={LdapGroupDetailView} />
              <SecureRoute path="/settings/:orgDomain?/site-roles/" exact component={SiteRoleManagement} />
              <SecureRoute path="/settings/:orgDomain/site-roles/details/:groupName" exact
                           component={SiteRoleDetailView} />
              <SecureRoute path="/settings/:orgDomain?/departments" exact component={LdapDepartmentManagement} />
              <SecureRoute path="/settings/:orgDomain/departments/details/:departmentName" exact
                           component={LdapDepartmentDetailView} />
              <SecureRoute path="/settings/organizations/" exact component={OrganizationManagement} />
              <SecureRoute path="/settings/organizations/details/:id" exact component={OrganizationDetailView} />
              <SecureRoute path="/settings/analytics-data-entries/" exact component={AnalyticsDataEntryManagement} />
              <SecureRoute path="/settings/analytics-data-entries/details/:id" exact
                           component={AnalyticsDataEntryDetailView} />
              <SecureRoute path="/settings/user-management/" exact component={UserManagement} />
              <SecureRoute path="/settings/user-management/active/:orgDomain/:userEmail/details" exact
                           component={UserDetailView} />
              <SecureRoute path="/settings/user-management/pending/:userId/details" exact
                           component={SsoUserDetailView} />

              <SecureRoute path="/settings/logs-backup-management" exact component={LogsBackupManagement} />
              <SecureRoute path="/settings/tags" exact component={TagEditor} />
              <SecureRoute path="/settings/tags/:id" exact component={TagDetailView} />
              <SecureRoute path="/settings/analytics-profile" exact component={AnalyticsProfileSettings} />
              <SecureRoute path="/settings/data_mapping" exact component={DataMappingManagement} />
              <SecureRoute path="/settings/data_mapping/projects/details/:projectMappingId" exact
                           component={ProjectDataMappingDetailView} />
              <SecureRoute path="/settings/data_mapping/pipeline/details/:pipelineDataMappingId" exact
                           component={PipelineDataMappingDetailView} />
              <SecureRoute path="/settings/data_mapping/user_mapping/details/:usersMappingId" exact
                           component={UserDataMappingDetailView} />

          {/*TODO: These are legacy routes that should probably be removed*/}
          <SecureRoute path="/dashboard" component={Dashboard} />
          <SecureRoute path="/tools/:id?" component={ApiConnector} />
          <SecureRoute path="/update" component={Update} />

              {/*<Route*/}
              {/*  path={"*"}*/}
              {/*  component={PageNotFound}*/}
              {/*/>*/}
          {/*  </Switch>*/}
          {/*</Router>*/}
        </div>
      </div>
      <OpseraFooter />
    </div>
  );
};

AppRoutes.propTypes = {
  authenticatedState: PropTypes.bool,
  isPublicPathState: PropTypes.bool,
  authClient: PropTypes.object,
  OKTA_CONFIG: PropTypes.object,
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};
export default AppRoutes;

