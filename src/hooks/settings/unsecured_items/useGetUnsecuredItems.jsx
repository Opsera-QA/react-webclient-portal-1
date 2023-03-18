import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import Model from "core/data_model/model";
import {
  unsecureItemsReportFilterMetadata
} from "components/settings/unsecured_items/unsecuredItemReportFilter.metadata";
import UnsecuredItemReportRoleHelper
  from "@opsera/know-your-role/roles/settings/unsecured_items/unsecuredItemReportRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import useUnsecuredItemReportActions from "components/settings/unsecured_items/useUnsecuredItemReportActions";

export default function useGetUnsecuredItems(handleErrorFunction) {
  const [unsecuredItems, setUnsecuredItems] = useState([]);
  const [unsecuredItemFilterModel, setUnsecuredItemFilterModel] = useState(new Model({ ...unsecureItemsReportFilterMetadata.newObjectFields }));
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const {
    userData,
  } = useComponentStateReference();
  const unsecuredItemReportActions = useUnsecuredItemReportActions();

  useEffect(() => {
    setUnsecuredItems([]);

    if (loadData) {
      loadData(getUnsecuredItems, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getUnsecuredItems = async (
    newFilterModel = unsecuredItemFilterModel,
  ) => {
    setUnsecuredItems([]);

    if (UnsecuredItemReportRoleHelper.canGetUnsecuredItemsList(userData) !== true) {
      return;
    }

    const response = await unsecuredItemReportActions.getUnassignedRulesItems(
      newFilterModel,
    );
    const items = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setUnsecuredItems([...items]);
    setUnsecuredItemFilterModel({...newFilterModel});
  };

  return ({
    unsecuredItems: unsecuredItems,
    setUnsecuredItems: setUnsecuredItems,
    unsecuredItemFilterModel: unsecuredItemFilterModel,
    setUnsecuredItemFilterModel: setUnsecuredItemFilterModel,
    loadData: async (newFilterModel) => loadData(async () => getUnsecuredItems(newFilterModel), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
