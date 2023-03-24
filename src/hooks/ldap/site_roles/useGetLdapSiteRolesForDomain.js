import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useLdapSiteRoleActions from "hooks/ldap/site_roles/useLdapSiteRoleActions";
import LdapSiteRoleGroupRoleHelper
  from "@opsera/know-your-role/roles/accounts/groups/role/ldapSiteRoleGroupRole.helper";

export default function useGetLdapSiteRolesForDomain(domain, handleErrorFunction) {
  const [siteRoles, setSiteRoles] = useState([]);
  const ldapSiteRoleActions = useLdapSiteRoleActions();
  const {
    userData,
    isSaasUser,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  const getLdapSiteRolesForDomain = async () => {
    const response = await ldapSiteRoleActions.getLdapSiteRolesWithDomain(
      domain,
    );

    setSiteRoles([...DataParsingHelper.parseArray(response?.data?.data, [])]);
  };

  const handleLoadData = () => {
    setSiteRoles([]);
    const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (
      isSaasUser === false
      && LdapSiteRoleGroupRoleHelper.canGetSiteRoleGroups(userData) === true
      && hasStringValue(domain) === true
      && (ldapDomain === domain || isOpseraAdministrator === true)
      && loadData
    ) {
      loadData(getLdapSiteRolesForDomain, handleErrorFunction);
    }
  };

  useEffect(() => {
    setSiteRoles([]);

    handleLoadData();
  }, []);

  return ({
    siteRoles: siteRoles,
    setSiteRoles: setSiteRoles,
    error: error,
    loadData: handleLoadData,
    isLoading: isLoading,
  });
}
