import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapOrganizationAccounts from "hooks/ldap/organization_accounts/useGetLdapOrganizationAccounts";
import OrganizationSettingsManagementSubNavigationBar
  from "components/admin/organization_settings/OrganizationSettingsManagementSubNavigationBar";
import OrganizationAccountSettingsPageLinkCard
  from "components/admin/organization_settings/OrganizationAccountSettingsPageLinkCard";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export default function OrganizationSettingsManagement() {
  const {
    accessRoleData,
  } = useComponentStateReference();
  const {
    ldapOrganizationAccounts,
    isLoading,
  } = useGetLdapOrganizationAccounts();

  const getCards = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Organization Accounts"}
        />
      );
    }

    return ldapOrganizationAccounts.map((organizationAccount) => {
      return (
        <OrganizationAccountSettingsPageLinkCard
          key={organizationAccount?.name}
          organizationAccount={organizationAccount}
          className={"m-2"}
        />
      );
    });
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationSettingsManagement"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      navigationTabContainer={<OrganizationSettingsManagementSubNavigationBar activeTab={"ldapOrganizationSettingsManagement"} />}
    >
      {getCards()}
    </ScreenContainer>
  );
}
