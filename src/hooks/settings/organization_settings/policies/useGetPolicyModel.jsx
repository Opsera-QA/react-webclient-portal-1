import PolicyModel from "components/settings/organization_settings/policies/policy.model";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetPolicyModel() {
  const { userData } = useComponentStateReference();

  const getPolicyModel = (
    policy,
    isNew,
  ) => {
    const model = new PolicyModel(
      policy,
      isNew,
    );

    model.userData = userData;

    return model;
  };

  return ({
    getPolicyModel: getPolicyModel,
  });
}
