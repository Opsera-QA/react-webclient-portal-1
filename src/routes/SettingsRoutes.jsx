import React from "react";
import { SecureRoute } from "@okta/okta-react";
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
import FreeTrialUserExpirationExtendUserAccessScreen
  from "components/settings/trial/user_expiration/extension/FreeTrialUserExpirationExtendUserAccessScreen";
import FreeTrialUserExpirationUserReinstatementScreen
  from "components/settings/trial/user_expiration/reinstatement/FreeTrialUserExpirationUserReinstatementScreen";
import FreeTrialUserExpirationUserRevocationScreen
  from "components/settings/trial/user_expiration/revocation/FreeTrialUserExpirationUserRevocationScreen";

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

      <SecureRoute path="/settings/logs-export-management" exact component={LogsExportManagement} />
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

      <SecureRoute
        path={"/settings/trial/user-expiration-management"}
        exact
        component={FreeTrialUserExpirationManagement}
      />
      <SecureRoute
        path={"/settings/trial/user-expiration-management/revocation"}
        exact
        component={FreeTrialUserExpirationUserRevocationScreen}
      />
      <SecureRoute
        path={"/settings/trial/user-expiration-management/reinstatement"}
        exact
        component={FreeTrialUserExpirationUserReinstatementScreen}
      />
      <SecureRoute
        path={"/settings/trial/user-expiration-management/extension"}
        exact
        component={FreeTrialUserExpirationExtendUserAccessScreen}
      />
    </>
  );
}

SettingsRoutes.propTypes = {};

