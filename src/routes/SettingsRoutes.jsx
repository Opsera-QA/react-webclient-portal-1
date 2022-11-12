import React from "react";
import AccountSettingsView from "components/settings/AccountSettings";
import DeleteTools from "components/settings/delete_tools/DeleteTools";
import LdapGroupManagement from "components/settings/ldap_groups/LdapGroupManagement";
import LdapGroupDetailView from "components/settings/ldap_groups/details/LdapGroupDetailView";
import SiteRoleManagement from "components/settings/ldap_site_roles/SiteRoleManagement";
import SiteRoleDetailView from "components/settings/ldap_site_roles/details/SiteRoleDetailView";
import LdapDepartmentManagement from "components/settings/ldap_departments/LdapDepartmentManagement";
import LdapDepartmentDetailView from "components/settings/ldap_departments/details/LdapDepartmentDetailView";
import OrganizationManagement from "components/settings/organizations/OrganizationManagement";
import OrganizationDetailView from "components/settings/organizations/organization_detail_view/OrganizationDetailView";
import AnalyticsDataEntryManagement from "components/settings/analytics_data_entry/AnalyticsDataEntryManagement";
import AnalyticsDataEntryDetailView
  from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryDetailView";
import UserManagement from "components/settings/users/UserManagement";
import UserDetailView from "components/settings/users/details/UserDetailView";
import SsoUserDetailView from "components/settings/users/sso_user_details/SsoUserDetailView";
import LogsExportManagement from "components/settings/logs_management/LogsExportManagement";
import UnsecuredItemReport from "components/settings/unsecured_items/UnsecuredItemReport";
import TagEditor from "components/settings/tags/TagManagement";
import TagDetailView from "components/settings/tags/tags_detail_view/TagDetailView";
import AnalyticsProfileSettings from "components/settings/analytics/analyticsProfileSettings";
import DataMappingManagement from "components/settings/data_mapping/DataMappingManagement";
import ProjectDataMappingDetailView
  from "components/settings/data_mapping/projects/details/ProjectDataMappingDetailView";
import PipelineDataMappingDetailView
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingDetailView";
import UserDataMappingDetailView from "components/settings/data_mapping/users/details/UserDataMappingDetailView";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialUserExpirationManagement
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";
import InsightsSettings from "components/settings/insights/InsightsSettings";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import FreeTrialUserExpirationUserRevocationScreen
  from "components/settings/trial/user_expiration/revocation/FreeTrialUserExpirationUserRevocationScreen";
import FreeTrialUserExpirationUserReinstatementScreen
  from "components/settings/trial/user_expiration/reinstatement/FreeTrialUserExpirationUserReinstatementScreen";
import FreeTrialUserExpirationExtendUserAccessScreen
  from "components/settings/trial/user_expiration/extension/FreeTrialUserExpirationExtendUserAccessScreen";
import FreeTrialUserActivityReportUserActivityViewer from "components/settings/trial/activity_report/user_activity/FreeTrialUserActivityReportUserActivityViewer";
import FreeTrialUserActivityReport
  from "components/settings/trial/activity_report/users/FreeTrialUserActivityReport";
import PipelineSettingsRoutes from "components/settings/pipelines/PipelineSettingsRoutes";

export default function SettingsRoutes() {
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isPowerUser !== true
  ) {
    return null;
  }

  return (
    <>
      <RoleRestrictedRoute
        path={"/settings"}
        exact={true}
        component={AccountSettingsView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/settings/insights"}
        exact={true}
        component={InsightsSettings}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />

      <RoleRestrictedRoute
        path={"/settings/delete"}
        exact={true}
        component={DeleteTools}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />

      <RoleRestrictedRoute
        path={"/settings/:orgDomain?/groups/"}
        exact={true}
        component={LdapGroupManagement}
        roleRequirement={ROLE_LEVELS.POWER_USERS}
      />
      <RoleRestrictedRoute
        path={"/settings/:orgDomain/groups/details/:groupName"}
        exact={true}
        component={LdapGroupDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS}
      />

      <RoleRestrictedRoute
        path={"/settings/:orgDomain?/site-roles/"}
        exact={true}
        component={SiteRoleManagement}
        roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path="/settings/:orgDomain/site-roles/details/:groupName"
        exact={true}
        component={SiteRoleDetailView}
        roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      />

      <RoleRestrictedRoute
        path={"/settings/:orgDomain?/departments"}
        exact={true}
        component={LdapDepartmentManagement}
        roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/:orgDomain/departments/details/:departmentName"}
        exact={true}
        component={LdapDepartmentDetailView}
        roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      />

      <RoleRestrictedRoute
        path={"/settings/organizations/"}
        exact={true}
        component={OrganizationManagement}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/settings/organizations/details/:id"}
        exact={true}
        component={OrganizationDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />

      <RoleRestrictedRoute
        path={"/settings/analytics-data-entries/"}
        exact={true}
        component={AnalyticsDataEntryManagement}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/settings/analytics-data-entries/details/:id"}
        exact={true}
        component={AnalyticsDataEntryDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />

      <RoleRestrictedRoute
        path={"/settings/user-management/"}
        exact={true}
        component={UserManagement}
        roleRequirement={ROLE_LEVELS.POWER_USERS}
      />
      <RoleRestrictedRoute
        path={"/settings/user-management/active/:orgDomain/:userEmail/details"}
        exact={true}
        component={UserDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS}
      />
      <RoleRestrictedRoute
        path={"/settings/user-management/pending/:userId/details"}
        exact={true}
        component={SsoUserDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS}
      />

      <RoleRestrictedRoute
        path="/settings/logs-export-management"
        exact={true}
        component={LogsExportManagement}
        roleRequirement={ROLE_LEVELS.POWER_USERS}
      />


      <RoleRestrictedRoute
        path="/settings/unsecured-items"
        exact
        component={UnsecuredItemReport}
        roleRequirement={ROLE_LEVELS.POWER_USERS}
      />

      <RoleRestrictedRoute
        path={"/settings/tags"}
        exact={true}
        component={TagEditor}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/settings/tags/:id"}
        exact={true}
        component={TagDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />

      <RoleRestrictedRoute
        path={"/settings/analytics-profile"}
        exact={true}
        component={AnalyticsProfileSettings}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />

      <RoleRestrictedRoute
        path={"/settings/data_mapping"}
        exact={true}
        component={DataMappingManagement}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/settings/data_mapping/projects/details/:projectMappingId"}
        exact={true}
        component={ProjectDataMappingDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/settings/data_mapping/pipeline/details/:pipelineDataMappingId"}
        exact={true}
        component={PipelineDataMappingDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/settings/data_mapping/user_mapping/details/:usersMappingId"}
        exact={true}
        component={UserDataMappingDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />

      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management"}
        exact={true}
        component={FreeTrialUserExpirationManagement}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management/revocation"}
        exact={true}
        component={FreeTrialUserExpirationUserRevocationScreen}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management/reinstatement"}
        exact={true}
        component={FreeTrialUserExpirationUserReinstatementScreen}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user-expiration-management/extension"}
        exact={true}
        component={FreeTrialUserExpirationExtendUserAccessScreen}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />

      <RoleRestrictedRoute
        path={"/settings/trial/user/activity-report/users/:userId?"}
        exact={true}
        component={FreeTrialUserActivityReportUserActivityViewer}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/settings/trial/user/activity-report/"}
        exact={true}
        component={FreeTrialUserActivityReport}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />

      <PipelineSettingsRoutes />
    </>
  );
}

SettingsRoutes.propTypes = {};

