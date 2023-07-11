import React, { useEffect } from "react";
import { SecureRoute } from "@okta/okta-react";
import AdminTools from "components/admin/AdminTools";
import RegisteredUsersManagement from "components/admin/registered_users/RegisteredUsersManagement";
import RegisteredUserDetailView
from "components/admin/registered_users/details/RegisteredUserDetailView";
import ManageSystems from "components/admin/manage_systems/ManageSystems";
import ReportsRegistration from "components/admin/analytics/ReportsRegistration";
import KpiIdentifierManagement from "components/admin/kpi_identifiers/KpiIdentifierManagement";
import KpiIdentifierDetailView from "components/admin/kpi_identifiers/details/KpiIdentifierDetailView";
import PipelineTemplateManagement from "components/admin/pipeline_templates/PipelineTemplateManagement";
import LdapOrganizationsView from "components/admin/accounts/ldap/organizations/LdapOrganizationManagement";
import LdapOrganizationDetailView
from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationDetailView";
import LdapCustomerOnboardView from "components/admin/accounts/ldap/customer_onboard/LdapCustomerOnboard";
import ApiConnectionTest from "components/admin/api_demo/ApiConnectionTest";
import PipelineTemplateDetailView from "components/admin/pipeline_templates/details/PipelineTemplateDetailView";
import ToolCategoryDetailView
from "components/admin/tools/categories/details/ToolCategoryDetailView";
import ToolIdentifierDetailView
from "components/admin/tools/identifiers/details/ToolIdentifierDetailView";
import LdapOrganizationAccountDetailView
from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountDetailView";
import LdapOrganizationAccountManagement
from "components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountManagement";
import Reports_Old from "components/reports/Reports_Old";
import SiteNotificationManagement from "components/admin/site_notifications/SiteNotificationManagement";
import SiteNotificationDetailView
from "components/admin/site_notifications/details/SiteNotificationDetailView";
import SiteNotificationManager from "components/admin/site_notifications/manager/SiteNotificationManager";
import PipelineStorageManagement from "components/admin/pipeline_storage/PipelineStorageManagement";
import PipelineStorageDetailView
from "components/admin/pipeline_storage/details/PipelineStorageDetailView";
import ToolCategoryManagement from "components/admin/tools/categories/ToolCategoryManagement";
import ToolIdentifierManagement from "components/admin/tools/identifiers/ToolIdentifierManagement";
import CustomEnvironmentVariableManagement
from "components/admin/environment_variables/CustomEnvironmentVariableManagement";
import TaskTemplateDetailView from "components/admin/task_templates/details/TaskTemplateDetailView";
import TaskTemplateManagement from "components/admin/task_templates/TaskTemplateManagement";
import PlatformSystemParameterManagement from "components/admin/system_parameters/PlatformSystemParameterManagement";
import PlatformSystemParameterDetailView
from "components/admin/system_parameters/details/PlatformSystemParameterDetailView";
import useComponentStateReference from "hooks/useComponentStateReference";
import PlatformSettingsManagement from "components/admin/platform_settings/PlatformSettingsManagement";
import PlatformSettingsDetailView from "components/admin/platform_settings/details/PlatformSettingsDetailView";
import RemoteApplicationManagement from "../components/admin/remote_applications/RemoteApplicationManagement";
import RemoteApplicationDetailView from "../components/admin/remote_applications/details/RemoteApplicationDetailView";
import OrganizationSettingsManagement from "components/admin/organization_settings/OrganizationSettingsManagement";
import OrganizationSettingsDetailView
from "components/admin/organization_settings/details/OrganizationSettingsDetailView";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapUserDetailView from "components/admin/accounts/ldap/users/details/LdapUserDetailView";

export default function AdminToolsRoutes() {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return <></>;
  }

  return (
    <>
      <SecureRoute path="/admin" exact component={AdminTools} />
      <SecureRoute path="/admin/custom-environment-variables" exact component={CustomEnvironmentVariableManagement} />
      <SecureRoute path="/admin/manage_systems" component={ManageSystems} />
      <SecureRoute path="/admin/registered-users" exact component={RegisteredUsersManagement} />
      <SecureRoute path="/admin/registered-users/:id" exact component={RegisteredUserDetailView} />
      <SecureRoute path="/admin/analytics/reports-registration" component={ReportsRegistration} />
      <SecureRoute path="/admin/tools/categories" exact component={ToolCategoryManagement} />
      <SecureRoute path="/admin/tools/identifiers" exact component={ToolIdentifierManagement} />
      <SecureRoute path="/admin/tools/types/details/:toolTypeId" exact component={ToolCategoryDetailView} />
      <SecureRoute path="/admin/tools/identifiers/details/:toolIdentifierId" exact
        component={ToolIdentifierDetailView} />
      <SecureRoute path="/admin/kpis" exact component={KpiIdentifierManagement} />
      <SecureRoute path="/admin/kpis/:id" exact component={KpiIdentifierDetailView} />

      <SecureRoute path="/admin/templates" exact component={PipelineTemplateManagement} />
      <SecureRoute path="/admin/templates/details/:templateId" exact component={PipelineTemplateDetailView} />

      <SecureRoute path="/admin/reports" exact component={Reports_Old} />
      <SecureRoute path="/admin/pipeline-storage" exact component={PipelineStorageManagement} />
      <SecureRoute path="/admin/pipeline-storage/details/:id" exact component={PipelineStorageDetailView} />


      <SecureRoute path="/admin/site-notifications/table" exact component={SiteNotificationManagement} />
      <SecureRoute path="/admin/site-notifications/details/:id" exact
        component={SiteNotificationDetailView} />
      <SecureRoute path="/admin/site-notifications" exact component={SiteNotificationManager} />

      <SecureRoute path="/admin/organizations" exact component={LdapOrganizationsView} />
      <SecureRoute path="/admin/organizations/details/:organizationName" exact
        component={LdapOrganizationDetailView} />
      <SecureRoute path="/admin/organization-accounts/:organizationName?" exact
        component={LdapOrganizationAccountManagement} />
      <SecureRoute path="/admin/organization-accounts/:organizationDomain/details" exact
        component={LdapOrganizationAccountDetailView} />
      <SecureRoute path="/admin/accounts/create" exact component={LdapCustomerOnboardView} />
      <SecureRoute
        path={"/admin/organization-accounts/:organizationDomain/users/:emailAddress/details"}
        exact
        component={LdapUserDetailView}
      />


      <SecureRoute path="/admin/templates/tasks" exact component={TaskTemplateManagement} />
      <SecureRoute path="/admin/templates/tasks/details/:templateId" exact component={TaskTemplateDetailView} />

      <SecureRoute path="/admin/platform/settings" exact component={PlatformSettingsManagement} />
      <SecureRoute path="/admin/platform/settings/details/:settingsId" exact component={PlatformSettingsDetailView} />

      <RoleRestrictedRoute
        path={"/admin/organization-settings"}
        exact={true}
        component={OrganizationSettingsManagement}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />
      <RoleRestrictedRoute
        path={"/admin/organization-settings/details/:organizationDomain/:organizationAccount"}
        exact={true}
        component={OrganizationSettingsDetailView}
        roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      />

      <SecureRoute path="/admin/platform/system-parameters" exact component={PlatformSystemParameterManagement} />
      <SecureRoute path="/admin/platform/system-parameters/details/:systemParameterId" exact
        component={PlatformSystemParameterDetailView} />
      <SecureRoute path="/admin/demo/api" component={ApiConnectionTest} />
      <SecureRoute path="/admin/remote-applications" exact component={RemoteApplicationManagement} />
      <SecureRoute path="/admin/remote-applications/details/:id" exact component={RemoteApplicationDetailView} />
    </>
  );
}

AdminToolsRoutes.propTypes = {};

