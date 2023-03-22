import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLdapGroupActions from "hooks/ldap/groups/useLdapGroupActions";
import useLoadData from "temp-library-components/useLoadData/useLoadData";

export default function useGetLdapGroups(domain, handleErrorFunction) {
  const [groups, setGroups] = useState([]);
  const ldapGroupActions = useLdapGroupActions();
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

  useEffect(() => {
    setGroups([]);

    const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (
      isSaasUser === false
      && hasStringValue(domain) === true
      && (ldapDomain === domain || isOpseraAdministrator === true)
      && loadData
    ) {
      loadData(getLdapGroupsForDomain, handleErrorFunction).catch(() => {
      });
    }
  }, []);

  const getLdapGroupsForDomain = async () => {
    const response = await ldapGroupActions.getLdapUserGroupsWithDomain(
      domain,
    );

    setGroups([...DataParsingHelper.parseArray(response?.data?.data, [])]);
  };

  return ({
    groups: groups,
    setGroups: setGroups,
    error: error,
    loadData: () => loadData(getLdapGroupsForDomain, handleErrorFunction),
    isLoading: isLoading,
  });
}
