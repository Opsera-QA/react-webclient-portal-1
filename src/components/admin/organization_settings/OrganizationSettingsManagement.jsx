import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapOrganizationAccounts from "hooks/ldap/organization_accounts/useGetLdapOrganizationAccounts";
import OrganizationSettingsManagementSubNavigationBar
  from "components/admin/organization_settings/OrganizationSettingsManagementSubNavigationBar";

export default function OrganizationSettingsManagement() {
  const {
    accessRoleData,
  } = useComponentStateReference();
  const {
    ldapOrganizationsAccounts,
  } = useGetLdapOrganizationAccounts();

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationSettingsManagement"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      navigationTabContainer={<OrganizationSettingsManagementSubNavigationBar activeTab={"ldapOrganizationSettingsManagement"} />}
    >
      {JSON.stringify(ldapOrganizationsAccounts)}
    </ScreenContainer>
  );
}
