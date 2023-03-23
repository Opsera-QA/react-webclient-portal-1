import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLdapGroupActions from "hooks/ldap/groups/useLdapGroupActions";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useGetLdapGroupModel from "hooks/ldap/groups/useGetLdapGroupModel";

export default function useGetLdapGroupModelByNameForDomain(
  domain,
  groupName,
  handleErrorFunction,
) {
  const [groupModel, setGroupModel] = useState(undefined);
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
  const { getLdapGroupModel } = useGetLdapGroupModel();

  useEffect(() => {
    setGroupModel(undefined);

    const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (
      isSaasUser === false
      && hasStringValue(domain) === true
      && (ldapDomain === domain || isOpseraAdministrator === true)
      && loadData
    ) {
      loadData(getLdapGroupByNameForDomain, handleErrorFunction).catch(() => {
      });
    }
  }, []);

  const getLdapGroupByNameForDomain = async () => {
    setGroupModel(undefined);

    const response = await ldapGroupActions.getLdapUserGroupsWithDomain(
      domain,
    );

    const group = DataParsingHelper.parseNestedObject(response, "data.data");

    if (group) {
      setGroupModel({...getLdapGroupModel(group, false)});
    }
  };

  return ({
    groupModel: groupModel,
    setGroupModel: setGroupModel,
    error: error,
    loadData: () => loadData(getLdapGroupByNameForDomain, handleErrorFunction),
    isLoading: isLoading,
  });
}
