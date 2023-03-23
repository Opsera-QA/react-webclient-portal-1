import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLdapGroupActions from "hooks/ldap/groups/useLdapGroupActions";
import useLoadData from "temp-library-components/useLoadData/useLoadData";

export default function useGetLdapGroups(handleErrorFunction) {
  const [groups, setGroups] = useState([]);
  const ldapGroupActions = useLdapGroupActions();
  const {
    isSaasUser,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setGroups([]);

    if (isSaasUser === false && loadData) {
      loadData(getLdapGroupsForDomain, handleErrorFunction).catch(() => {
      });
    }
  }, []);

  const getLdapGroupsForDomain = async () => {
    const response = await ldapGroupActions.getLdapUserGroups();

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
