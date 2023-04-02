import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useWorkspaceActions from "hooks/workspace/useWorkspaceActions";
import WorkspaceFilterModel from "components/workspace/views/workspace.filter.model";

export default function useGetWorkspaceItems(
  fields,
  active,
  pageSize,
  handleErrorFunction,
) {
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [workspaceFilterModel, setWorkspaceFilterModel] = useState(new WorkspaceFilterModel());
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const workspaceActions = useWorkspaceActions();

  useEffect(() => {
    setWorkspaceItems([]);

    if (pageSize) {
      workspaceFilterModel.setData("pageSize", pageSize);
    }

    if (loadData) {
      loadData(getWorkspaceItems, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getWorkspaceItems = async (
    newFilterModel = workspaceFilterModel,
  ) => {
    const response = await workspaceActions.getWorkspaceItems(
      newFilterModel,
      fields,
      active,
    );
    const items = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setWorkspaceItems([...items]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setWorkspaceFilterModel({...newFilterModel});
  };

  return ({
    workspaceItems: workspaceItems,
    setWorkspaceItems: setWorkspaceItems,
    workspaceFilterModel: workspaceFilterModel,
    setWorkspaceFilterModel: setWorkspaceFilterModel,
    loadData: async (newFilterModel) => loadData(async () => getWorkspaceItems(newFilterModel), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
