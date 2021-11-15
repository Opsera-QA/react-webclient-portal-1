import React from "react";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
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
  from "components/admin/template_editor/PipelineTemplateManagementPageLinkCard";
import ToolManagementPageLinkCard from "components/admin/tools/ToolManagementPageLinkCard";

function AdminToolsPageLinkCards({accessRoleData}) {
  return (
    <div>
      <ApiConnectionDemoPageLinkCard
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
