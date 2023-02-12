import { useState } from "react";
import useGetPolicyModel from "hooks/settings/organization_settings/policies/useGetPolicyModel";

export default function useGetNewPolicyModel() {
  const { getPolicyModel } = useGetPolicyModel();
  const [policyModel, setPolicyModel] = useState(getPolicyModel(undefined, true));

  return ({
    policyModel: policyModel,
    setPolicyModel: setPolicyModel,
  });
}
