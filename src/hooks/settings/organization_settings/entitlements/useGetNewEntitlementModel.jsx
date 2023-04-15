import { useState } from "react";
import useGetEntitlementModel from "hooks/settings/organization_settings/entitlements/useGetEntitlementModel";

export default function useGetNewEntitlementModel() {
  const { getEntitlementModel } = useGetEntitlementModel();
  const [entitlementModel, setEntitlementModel] = useState(getEntitlementModel(undefined, true));

  return ({
    entitlementModel: entitlementModel,
    setEntitlementModel: setEntitlementModel,
  });
}
