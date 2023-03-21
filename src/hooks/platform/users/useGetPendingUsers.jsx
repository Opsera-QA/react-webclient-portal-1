import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePlatformUsersActions from "hooks/platform/users/usePlatformUsersActions";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function useGetPendingUsers(
  organizationDomain,
  organizationAccount,
  handleErrorFunction,
) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const platformUsersActions = usePlatformUsersActions();
  const {
    isSaasUser,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPendingUsers([]);

    if (loadData) {
      loadData(getPendingUsers, handleErrorFunction).catch(() => {
      });
    }
  }, [organizationDomain, organizationAccount,]);

  const getPendingUsers = async () => {
    setPendingUsers([]);

    if (isSaasUser !== false || hasStringValue(organizationAccount) !== true || hasStringValue(organizationDomain) !== true) {
      return;
    }

    const response = await platformUsersActions.getPendingUsers(organizationDomain, organizationAccount,);
    setPendingUsers([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
  };

  return ({
    pendingUsers: pendingUsers,
    setPendingUsers: setPendingUsers,
    error: error,
    loadData: () => loadData(getPendingUsers, handleErrorFunction),
    isLoading: isLoading,
  });
}
