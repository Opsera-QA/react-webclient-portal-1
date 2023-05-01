import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useComponentStateReference from "hooks/useComponentStateReference";
import useEntitlementAdministrationActions
  from "hooks/settings/organization_settings/entitlements/useEntitlementAdministrationActions";
import EntitlementRoleHelper from "@opsera/know-your-role/roles/accounts/entitlements/entitlementRole.helper";

export default function useGetEntitlements(handleErrorFunction) {
  const [entitlements, setEntitlements] = useState([]);
  const entitlementAdministrationActions = useEntitlementAdministrationActions();
  const {
    userData,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setEntitlements([]);
    loadData(getEntitlements, handleErrorFunction).catch(() => {});
  }, []);

  const getEntitlements = async () => {
    setEntitlements([]);

    if (EntitlementRoleHelper.canGetEntitlements(userData) !== true) {
      return;
    }

    const response = await entitlementAdministrationActions.getEntitlements();
    setEntitlements([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
  };

  return ({
    entitlements: entitlements,
    setEntitlements: setEntitlements,
    loadData: () => loadData(getEntitlements, handleErrorFunction),
    isLoading: isLoading,
    error: error,
  });
}
