import { useEffect, useState } from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import useEntitlementAdministrationActions
  from "hooks/settings/organization_settings/entitlements/useEntitlementAdministrationActions";
import useGetEntitlementModel from "hooks/settings/organization_settings/entitlements/useGetEntitlementModel";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";

export default function useGetEntitlementModelByName(
  entitlementName,
  handleErrorFunction,
) {
  const [entitlementModel, setEntitlementModel] = useState(undefined);
  const { getEntitlementModel } = useGetEntitlementModel();
  const { isSaasUser } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const entitlementActions = useEntitlementAdministrationActions();
  const { isOpseraAdministrator } = useComponentStateReference();

  useEffect(() => {
    setEntitlementModel(undefined);

    if (entitlementConstants.isEntitlementNameValid(entitlementName) === true && isSaasUser === false) {
      loadData(getEntitlement, handleErrorFunction).catch(() => {
      });
    }
  }, [entitlementName]);

  const getEntitlement = async () => {
    if (isOpseraAdministrator !== true) {
      return;
    }

    const response = await entitlementActions.getEntitlementByName(
      entitlementName,
    );

    const entitlement = DataParsingHelper.parseNestedObject(response, "data.data");

    if (entitlement) {
      const newModel = getEntitlementModel(
        entitlement,
        false,
      );
      setEntitlementModel({ ...newModel });
    }
  };

  return ({
    entitlementModel: entitlementModel,
    setEntitlementModel: setEntitlementModel,
    error: error,
    setError: setError,
    loadData: () => loadData(getEntitlement, handleErrorFunction),
    isLoading: isLoading,
  });
}
