import useApiService from "hooks/api/service/useApiService";
import {workspaceConstants} from "components/workspace/workspace.constants";

export default function useWorkspaceActions() {
  const apiService = useApiService();
  const workspaceActions = {};

  workspaceActions.getWorkspaceItems = async (
    workspaceFilterModel,
    fields,
 ) => {
    const apiUrl = `/workspace/items`;

    const queryParameters = {
      sortOption: workspaceFilterModel?.getData("sortOption"),
      currentPage: workspaceFilterModel?.getData("currentPage"),
      pageSize: workspaceFilterModel?.getData("pageSize"),
      toolIdentifier: workspaceFilterModel?.getData("toolIdentifier"),
      tag: workspaceFilterModel?.getData("tag"),
      active: workspaceFilterModel?.getFilterValue("status"),
      search: workspaceFilterModel?.getFilterValue("search"),
      owner: workspaceFilterModel?.getFilterValue("owner"),
      fields: fields,
    };

    const type = workspaceFilterModel?.getFilterValue("type");

    if (workspaceConstants.isWorkspaceTypeValid(type) === true) {
      queryParameters.type = type;
    }

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return workspaceActions;
}
