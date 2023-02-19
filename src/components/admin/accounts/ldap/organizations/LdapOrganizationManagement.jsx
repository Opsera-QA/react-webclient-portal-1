import React, {useContext, useState, useRef} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import LdapOrganizationsTable from "components/admin/accounts/ldap/organizations/LdapOrganizationsTable";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapOrganizationManagementSubNavigationBar
  from "components/admin/accounts/ldap/organizations/LdapOrganizationManagementSubNavigationBar";
import useGetLdapOrganizations from "hooks/ldap/organizations/useGetLdapOrganizations";
import useComponentStateReference from "hooks/useComponentStateReference";

function LdapOrganizationManagement() {
  const isMounted = useRef(false);
  const {
    ldapOrganizations,
    isLoading,
    loadData,
  } = useGetLdapOrganizations();
  const {
    accessRoleData,
  } = useComponentStateReference();

  return (
    <ScreenContainer
      breadcrumbDestination={"ldapOrganizationManagement"}
      isLoading={!accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <LdapOrganizationManagementSubNavigationBar
          activeTab={"organizations"}
        />
      }
    >
      <LdapOrganizationsTable
        isMounted={isMounted}
        isLoading={isLoading}
        organizations={ldapOrganizations}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}

export default LdapOrganizationManagement;

