import { useEffect, useState } from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetEntitlementModel from "hooks/settings/organization_settings/entitlements/useGetEntitlementModel";
import useEntitlementAdministrationActions
  from "hooks/settings/organization_settings/entitlements/useEntitlementAdministrationActions";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetEntitlementModelById(
  entitlementId,
  handleErrorFunction,
) {
  const [entitlementModel, setEntitlementModel] = useState(undefined);
  const { getEntitlementModel } = useGetEntitlementModel();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const entitlementAdministrationActions = useEntitlementAdministrationActions();
  const { isOpseraAdministrator } = useComponentStateReference();

  useEffect(() => {
    setEntitlementModel(undefined);

    if (isMongoDbId(entitlementId) === true) {
      loadData(getEntitlement, handleErrorFunction).catch(() => {
      });
    }
  }, [entitlementId]);

  const getEntitlement = async () => {
    setEntitlementModel(undefined);

    if (isOpseraAdministrator !== true) {
      return;
    }

    const response = await entitlementAdministrationActions.getEntitlementById(
      entitlementId,
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
