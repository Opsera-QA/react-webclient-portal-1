import React from "react";
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
import RemoteApplicationManagementPageLinkCard
  from "components/admin/remote_applications/RemoteApplicationManagementPageLinkCard";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function AdminToolsPageLinkCards() {
  return (
    <div className={"mx-2"}>
      <H5FieldSubHeader
        subheaderText={"Opsera User and LDAP Settings"}
      />
      <OrganizationSettingsManagementPageLinkCard />
      <LdapOrganizationManagementPageLinkCard />
      <RegisteredUsersManagementPageLinkCard />

      <H5FieldSubHeader
        subheaderText={"Platform Settings"}
      />
      <CustomEnvironmentVariableManagementPageLinkCard />
      <PlatformSystemParameterManagementPageLinkCard />
      <PlatformSettingsManagementPageLinkCard />
      <SiteNotificationManagementPageLinkCard />

      <H5FieldSubHeader
        subheaderText={"Platform Data Entry"}
      />
      <KpiIdentifierManagementPageLinkCard />
      <PipelineStorageManagementPageLinkCard />
      <PipelineTemplateManagementPageLinkCard />
      <RemoteApplicationManagementPageLinkCard />
      <TaskTemplateManagementPageLinkCard />
      <ToolManagementPageLinkCard />

      <H5FieldSubHeader
        subheaderText={"Platform Analysis"}
      />
      <ApiConnectionDemoPageLinkCard />
    </div>
  );
}

AdminToolsPageLinkCards.propTypes = {};
