import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import ToolFilterModel from "components/inventory/tools/tool.filter.model";
import useRegistryToolActions from "hooks/tools/useRegistryToolActions";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetRegistryTools(
  fields,
  pageSize,
  setUrlParameters = false,
  handleErrorFunction,
) {
  const [registryTools, setRegistryTools] = useState([]);
  const [registryToolFilterModel, setRegistryToolFilterModel] = useState(new ToolFilterModel(setUrlParameters));
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const { userData } = useComponentStateReference();
  const registryToolActions = useRegistryToolActions();

  useEffect(() => {
    setRegistryTools([]);

    if (pageSize) {
      registryToolFilterModel.setData("pageSize", pageSize);
    }

    if (loadData) {
      loadData(getRegistryTools, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getRegistryTools = async (
    newFilterModel = registryToolFilterModel,
  ) => {
    if (RegistryToolRoleHelper.canGetRegistryTools(userData) !== true) {
      return;
    }

    const response = await registryToolActions.getRegistryTools(
      newFilterModel,
      fields,
    );
    const newTools = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setRegistryTools([...newTools]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setRegistryToolFilterModel({...newFilterModel});
  };

  return ({
    registryTools: registryTools,
    setRegistryTools: setRegistryTools,
    registryToolFilterModel: registryToolFilterModel,
    setRegistryToolFilterModel: setRegistryToolFilterModel,
    loadData: async (newFilterModel) => loadData(async () => getRegistryTools(newFilterModel), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
