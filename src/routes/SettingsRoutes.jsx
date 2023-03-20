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
import TagDetailView from "components/settings/tags/details/TagDetailView";
import AnalyticsProfileSettings from "components/settings/analytics/analyticsProfileSettings";
import DataMappingManagement from "components/settings/data_mapping/DataMappingManagement";
import ProjectDataMappingDetailView
  from "components/settings/data_mapping/projects/details/ProjectDataMappingDetailView";
import PipelineDataMappingDetailView
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingDetailView";
import UserDataMappingDetailView from "components/settings/data_mapping/users/details/UserDataMappingDetailView";
import useComponentStateReference from "hooks/useComponentStateReference";
import InsightsSettings from "components/settings/insights/InsightsSettings";
import PipelinesSettingsRoutes from "components/settings/pipelines/PipelinesSettingsRoutes";
import PolicyManagement from "components/settings/organization_settings/policies/PolicyManagement";
import PolicyDetailView from "components/settings/organization_settings/policies/details/PolicyDetailView";
import {accountSettingsTrails} from "components/settings/accountSettings.trails";
import BreadcrumbRoute from "temp-library-components/routes/BreadcrumbRoute";

export default function SettingsRoutes() {
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <>
      <BreadcrumbRoute
        path={"/settings"}
        exact={true}
        component={AccountSettingsView}
        breadcrumb={accountSettingsTrails.accountSettings}
      />
      <BreadcrumbRoute
        path={"/settings/insights"}
        exact={true}
        component={InsightsSettings}
        breadcrumb={accountSettingsTrails.insightsSettings}
      />

      <BreadcrumbRoute
        path={"/settings/delete"}
        exact={true}
        component={DeleteTools}
        breadcrumb={accountSettingsTrails.deleteTools}
      />

      <BreadcrumbRoute
        path={"/settings/:orgDomain?/groups/"}
        exact={true}
        component={LdapGroupManagement}
        breadcrumb={accountSettingsTrails.ldapGroupManagement}
      />
      <BreadcrumbRoute
        path={"/settings/:orgDomain/groups/details/:groupName"}
        exact={true}
        component={LdapGroupDetailView}
        breadcrumb={accountSettingsTrails.ldapGroupDetailView}
      />

      <BreadcrumbRoute
        path={"/settings/:orgDomain?/site-roles/"}
        exact={true}
        component={SiteRoleManagement}
        breadcrumb={accountSettingsTrails.ldapSiteRolesManagement}
      />
      <BreadcrumbRoute
        path="/settings/:orgDomain/site-roles/details/:groupName"
        exact={true}
        component={SiteRoleDetailView}
        breadcrumb={accountSettingsTrails.ldapSiteRoleDetailView}
      />

      <BreadcrumbRoute
        path={"/settings/organization-settings/policies/"}
        exact={true}
        component={PolicyManagement}
        breadcrumb={accountSettingsTrails.policyManagement}
      />
      <BreadcrumbRoute
        path={"/settings/organization-settings/policies/:policyId"}
        exact={true}
        component={PolicyDetailView}
        breadcrumb={accountSettingsTrails.policyDetailView}
      />

      <BreadcrumbRoute
        path={"/settings/:orgDomain?/departments"}
        exact={true}
        component={LdapDepartmentManagement}
        breadcrumb={accountSettingsTrails.ldapDepartmentManagement}
      />
      <BreadcrumbRoute
        path={"/settings/:orgDomain/departments/details/:departmentName"}
        exact={true}
        component={LdapDepartmentDetailView}
        breadcrumb={accountSettingsTrails.ldapDepartmentDetailView}
      />

      <BreadcrumbRoute
        path={"/settings/organizations/"}
        exact={true}
        component={OrganizationManagement}
        breadcrumb={accountSettingsTrails.organizationManagement}
      />
      <BreadcrumbRoute
        path={"/settings/organizations/details/:id"}
        exact={true}
        component={OrganizationDetailView}
        breadcrumb={accountSettingsTrails.organizationDetailView}
      />

      <BreadcrumbRoute
        path={"/settings/analytics-data-entries/"}
        exact={true}
        component={AnalyticsDataEntryManagement}
        breadcrumb={accountSettingsTrails.analyticsDataEntryManagement}
      />
      <BreadcrumbRoute
        path={"/settings/analytics-data-entries/details/:id"}
        exact={true}
        component={AnalyticsDataEntryDetailView}
        breadcrumb={accountSettingsTrails.analyticsDataEntryDetailView}
      />

      <BreadcrumbRoute
        path={"/settings/user-management/"}
        exact={true}
        component={UserManagement}
        breadcrumb={accountSettingsTrails.userManagement}
      />
      <BreadcrumbRoute
        path={"/settings/user-management/active/:orgDomain/:userEmail/details"}
        exact={true}
        component={UserDetailView}
        breadcrumb={accountSettingsTrails.activeUserDetailView}
      />
      <BreadcrumbRoute
        path={"/settings/user-management/pending/:userId/details"}
        exact={true}
        component={SsoUserDetailView}
        breadcrumb={accountSettingsTrails.pendingUserDetailView}
      />

      <BreadcrumbRoute
        path="/settings/logs-export-management"
        exact={true}
        component={LogsExportManagement}
        breadcrumb={accountSettingsTrails.logsExportManagement}
      />

      <BreadcrumbRoute
        path="/settings/unsecured-items"
        exact
        component={UnsecuredItemReport}
        breadcrumb={accountSettingsTrails.unsecuredItemReport}
      />

      <BreadcrumbRoute
        path={"/settings/tags"}
        exact={true}
        component={TagEditor}
        breadcrumb={accountSettingsTrails.tagManagement}
      />
      <BreadcrumbRoute
        path={"/settings/tags/:id"}
        exact={true}
        component={TagDetailView}
        breadcrumb={accountSettingsTrails.tagDetailView}
      />

      <BreadcrumbRoute
        path={"/settings/analytics-profile"}
        exact={true}
        component={AnalyticsProfileSettings}
        breadcrumb={accountSettingsTrails.analyticsProfile}
      />

      <BreadcrumbRoute
        path={"/settings/data_mapping"}
        exact={true}
        component={DataMappingManagement}
        breadcrumb={accountSettingsTrails.dataMappingManagement}
      />
      <BreadcrumbRoute
        path={"/settings/data_mapping/projects/details/:projectMappingId"}
        exact={true}
        component={ProjectDataMappingDetailView}
        breadcrumb={accountSettingsTrails.projectTaggingDetailView}
      />
      <BreadcrumbRoute
        path={"/settings/data_mapping/pipeline/details/:pipelineDataMappingId"}
        exact={true}
        component={PipelineDataMappingDetailView}
        breadcrumb={accountSettingsTrails.pipelineDataMappingDetailView}
      />
      <BreadcrumbRoute
        path={"/settings/data_mapping/user_mapping/details/:usersMappingId"}
        exact={true}
        component={UserDataMappingDetailView}
        breadcrumb={accountSettingsTrails.userTaggingDetailView}
      />

      <PipelinesSettingsRoutes />
    </>
  );
}

SettingsRoutes.propTypes = {};

