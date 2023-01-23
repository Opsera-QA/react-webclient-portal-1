import { useEffect, useState } from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetPolicyModel from "hooks/settings/organization_settings/policies/useGetPolicyModel";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import usePolicyActions from "hooks/settings/organization_settings/policies/usePolicyActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetPolicyModelByName(
  policyName,
) {
  const [policyModel, setPolicyModel] = useState(undefined);
  const { getPolicyModel } = useGetPolicyModel();
  const { isSaasUser } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const policyActions = usePolicyActions();

  useEffect(() => {
    setPolicyModel(undefined);

    if (policyConstants.isPolicyNameValid(policyName) === true && isSaasUser === false) {
      loadData(getPolicy).catch(() => {
      });
    }
  }, [policyName]);

  const getPolicy = async () => {
    const response = await policyActions.getPolicyByName(
      policyName,
    );

    const policy = DataParsingHelper.parseNestedObject(response, "data.data");

    if (policy) {
      const newModel = getPolicyModel(
        policy,
        false,
      );
      setPolicyModel({ ...newModel });
    }
  };

  return ({
    policyModel: policyModel,
    setPolicyModel: setPolicyModel,
    error: error,
    setError: setError,
    loadData: () => loadData(getPolicy),
    isLoading: isLoading,
  });
}
