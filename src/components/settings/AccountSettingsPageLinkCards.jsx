import React from "react";
import PropTypes from "prop-types";
import AnalyticsDataEntryPageLinkCard from "components/settings/analytics_data_entry/AnalyticsDataEntryPageLinkCard";
import LoadingDialog from "components/common/status_notifications/loading";
import AnalyticsProfilePageLinkCard from "components/settings/analytics/AnalyticsProfilePageLinkCard";
import DataMappingManagementPageLinkCard from "components/settings/data_mapping/DataMappingManagementPageLinkCard";
import DeleteToolsManagementPageLinkCard from "components/settings/delete_tools/DeleteToolsManagementPageLinkCard";
import LdapDepartmentManagementPageLinkCard
  from "components/settings/ldap_departments/LdapDepartmentManagementPageLinkCard";
import LdapGroupManagementPageLinkCard from "components/settings/ldap_groups/LdapGroupManagementPageLinkCard";
import LdapSiteRoleManagementPageLinkCard from "components/settings/ldap_site_roles/LdapSiteRoleManagementPageLinkCard";
import UserManagementPageLinkCard from "components/settings/users/UserManagementPageLinkCard";
import TagManagementPageLinkCard from "components/settings/tags/TagManagementPageLinkCard";
import OrganizationManagementPageLinkCard from "components/settings/organizations/OrganizationManagementPageLinkCard";
import UserSettingsPageLinkCard from "components/user/user_settings/UserSettingsPageLinkCard";
import LogsExportManagementPageLinkCard from "components/settings/logs_management/LogsExportManagementPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialUserExpirationManagementPageLinkCard
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementPageLinkCard";
import FreeTrialUserActivityReportPageLinkCard
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportPageLinkCard";

function AccountSettingsPageLinkCards({accessRoleData}) {

  if (accessRoleData == null) {
    return (<LoadingDialog size={"sm"} />);
  }

  return (
    <div>
      <AnalyticsDataEntryPageLinkCard
        accessRoleData={accessRoleData}
      />
      <AnalyticsProfilePageLinkCard
        accessRoleData={accessRoleData}
      />
      <DataMappingManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <DeleteToolsManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapDepartmentManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapGroupManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      {/*<UserSettingsPageLinkCard*/}
      {/*  accessRoleData={accessRoleData}*/}
      {/*/>*/}
      <OrganizationManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LogsExportManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <LdapSiteRoleManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <TagManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <UserManagementPageLinkCard
        accessRoleData={accessRoleData}
      />
      <FreeTrialUserExpirationManagementPageLinkCard />
      <FreeTrialUserActivityReportPageLinkCard />
    </div>
  );
}

AccountSettingsPageLinkCards.propTypes = {
  accessRoleData: PropTypes.object,
};

export default AccountSettingsPageLinkCards;
