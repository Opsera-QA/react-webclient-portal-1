import { useState } from "react";
import useGetEntitlementModel from "hooks/settings/organization_settings/entitlements/useGetEntitlementModel";

export default function useGetNewEntitlementModel(entitlementName) {
  const { getChildEntitlementModelWithName, getNewEntitlementModelWithName } = useGetEntitlementModel();
  const [entitlementModel, setEntitlementModel] = useState(getNewEntitlementModelWithName(entitlementName));
  const [childEntitlementModel, setChildEntitlementModel] = useState(getChildEntitlementModelWithName(entitlementName));

  return ({
    entitlementModel: entitlementModel,
    setEntitlementModel: setEntitlementModel,
    childEntitlementModel: childEntitlementModel,
    setChildEntitlementModel: setChildEntitlementModel,
  });
}
