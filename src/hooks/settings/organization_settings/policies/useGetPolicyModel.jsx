import PolicyModel from "components/settings/organization_settings/policies/policy.model";

export default function useGetPolicyModel() {
  const getPolicyModel = (
    policy,
    isNew,
  ) => {
    return new PolicyModel(
      policy,
      isNew,
    );
  };

  return ({
    getPolicyModel: getPolicyModel,
  });
}
