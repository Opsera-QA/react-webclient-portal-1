import React from "react";
import PropTypes from "prop-types";
import ApiConnectionDemoPageLinkCard from "components/admin/api_demo/ApiConnectionDemoPageLinkCard";
import KpiIdentifierManagementPageLinkCard from "components/admin/kpi_identifiers/KpiIdentifierManagementPageLinkCard";
import PipelineStorageManagementPageLinkCard
  from "components/admin/pipeline_storage/PipelineStorageManagementPageLinkCard";
import RegisteredUsersManagementPageLinkCard
  from "components/admin/registered_users/RegisteredUsersManagementPageLinkCard";
import SiteNotificationManagementPageLinkCard
  from "components/admin/site_notifications/SiteNotificationManagementPageLinkCard";
import LdapOrganizationManagementPageLinkCard
  from "components/admin/accounts/ldap/organizations/LdapOrganizationManagementPageLinkCard";
import LdapCustomerOnboardingPageLinkCard
  from "components/admin/accounts/ldap/customer_onboard/LdapCustomerOnboardingPageLinkCard";
import PipelineTemplateManagementPageLinkCard
  from "components/admin/pipeline_templates/PipelineTemplateManagementPageLinkCard";
import ToolManagementPageLinkCard from "components/admin/tools/ToolManagementPageLinkCard";
import CustomEnvironmentVariableManagementPageLinkCard
  from "components/admin/environment_variables/CustomEnvironmentVariableManagementPageLinkCard";
import TaskTemplateManagementPageLinkCard from "components/admin/task_templates/TaskTemplateManagementPageLinkCard";
import PlatformSystemParameterManagementPageLinkCard
  from "components/admin/system_parameters/PlatformSystemParameterManagementPageLinkCard";
import PlatformSettingsManagementPageLinkCard
  from "components/admin/platform_settings/PlatformSettingsManagementPageLinkCard";
import OrganizationSettingsManagementPageLinkCard
  from "components/admin/organization_settings/OrganizationSettingsManagementPageLinkCard";

function AdminToolsPageLinkCards({accessRoleData}) {
  return (
    <div className={"mx-2"}>
      <ApiConnectionDemoPageLinkCard
        accessRoleData={accessRoleData}
      />
      <CustomEnvironmentVariableManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapCustomerOnboardingPageLinkCard
        accessRoleData={accessRoleData}
      />
      <KpiIdentifierManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapOrganizationManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <OrganizationSettingsManagementPageLinkCard />
      <PipelineStorageManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <RegisteredUsersManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <SiteNotificationManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <PipelineTemplateManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <PlatformSettingsManagementPageLinkCard />
      <PlatformSystemParameterManagementPageLinkCard />
      <TaskTemplateManagementPageLinkCard />
      <ToolManagementPageLinkCard
        accessRoleData={accessRoleData}
      />

      {/*TODO: These are left here for legacy reasons but will need to be fixed and have cards created if we want them visible.*/}
      {/* <BreadcrumbPageLink breadcrumbDestination={"systemStatus"} /> */}
      {/*<BreadcrumbPageLink breadcrumbDestination={"systemHealthCheck"} />*/}
      {/*<BreadcrumbPageLink breadcrumbDestination={"deprecatedReports"} />*/}
      {/*<BreadcrumbPageLink breadcrumbDestination={"reportsRegistration"} />*/}
      {/*<BreadcrumbPageLink breadcrumbDestination={"systemManagement"} />*/}
    </div>
  );
}

AdminToolsPageLinkCards.propTypes = {
  accessRoleData: PropTypes.object,
};

export default AdminToolsPageLinkCards;
