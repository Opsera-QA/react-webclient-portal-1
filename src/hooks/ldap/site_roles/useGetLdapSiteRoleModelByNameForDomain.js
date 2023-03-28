import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import LdapSiteRoleGroupRoleHelper
  from "@opsera/know-your-role/roles/accounts/groups/role/ldapSiteRoleGroupRole.helper";
import useLdapSiteRoleActions from "hooks/ldap/site_roles/useLdapSiteRoleActions";
import useGetSiteRoleModel from "hooks/ldap/site_roles/useGetSiteRoleModel";

export default function useGetLdapSiteRoleModelByNameForDomain(
  domain,
  groupName,
  handleErrorFunction,
) {
  const [siteRoleModel, setSiteRoleModel] = useState(undefined);
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
  const { getSiteRoleModel } = useGetSiteRoleModel();

  const getLdapSiteRolesForDomain = async () => {
    setSiteRoleModel(undefined);
    const response = await ldapSiteRoleActions.getLdapUserSiteRoleByNameWithDomain(
      domain,
      groupName,
    );

    const siteRole = DataParsingHelper.parseNestedObject(response, "data.data");

    if (siteRole) {
      setSiteRoleModel({...getSiteRoleModel(domain, siteRole, false)});
    }
  };

  const handleLoadData = () => {
    const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (
      isSaasUser === false
      && LdapSiteRoleGroupRoleHelper.canGetSiteRoleGroup(userData) === true
      && hasStringValue(domain) === true
      && (ldapDomain === domain || isOpseraAdministrator === true)
      && loadData
    ) {
      loadData(getLdapSiteRolesForDomain, handleErrorFunction);
    }
  };

  useEffect(() => {
    setSiteRoleModel(undefined);
    handleLoadData();
  }, []);

  return ({
    siteRoleModel: siteRoleModel,
    setSiteRoleModel: setSiteRoleModel,
    error: error,
    loadData: handleLoadData,
    isLoading: isLoading,
  });
}
