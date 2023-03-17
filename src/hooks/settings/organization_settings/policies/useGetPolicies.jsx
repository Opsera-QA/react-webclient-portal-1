import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import usePolicyActions from "hooks/settings/organization_settings/policies/usePolicyActions";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import PolicyRoleHelper from "@opsera/know-your-role/roles/settings/policies/policyRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetPolicies() {
  const [policies, setPolicies] = useState([]);
  const policyActions = usePolicyActions();
  const {
    userData,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPolicies([]);
    loadData(getPolicies).catch(() => {});
  }, []);

  const getPolicies = async () => {
    setPolicies([]);

    if (PolicyRoleHelper.canGetPolicies(userData) !== true) {
      return;
    }

    const response = await policyActions.getPolicies();
    setPolicies([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
  };

  return ({
    policies: policies,
    setPolicies: setPolicies,
    loadData: () => loadData(getPolicies),
    isLoading: isLoading,
    error: error,
  });
}
