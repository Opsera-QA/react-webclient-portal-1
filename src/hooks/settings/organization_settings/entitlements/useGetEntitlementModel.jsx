import useComponentStateReference from "hooks/useComponentStateReference";
import EntitlementModel from "components/admin/organization_settings/details/entitlements/entitlement.model";

export default function useGetEntitlementModel() {
  const { userData } = useComponentStateReference();

  const getEntitlementModel = (
    entitlement,
    isNew,
  ) => {
    const model = new EntitlementModel(
      entitlement,
      isNew,
    );

    model.userData = userData;

    return model;
  };

  return ({
    getEntitlementModel: getEntitlementModel,
  });
}
