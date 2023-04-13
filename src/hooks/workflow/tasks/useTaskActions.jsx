import useApiService from "hooks/api/service/useApiService";

export default function useTaskActions() {
  const apiService = useApiService();
  const taskActions = {};

  taskActions.getTasks = async (
    taskFilterModel,
    fields,
 ) => {
    const apiUrl = `/tasks`;
    const queryParameters = {
      sort: taskFilterModel?.getFilterValue("sortOption"),
      page: taskFilterModel?.getFilterValue("currentPage"),
      size: taskFilterModel?.getFilterValue("pageSize"),
      tag: taskFilterModel?.getFilterValue("tag"),
      type: taskFilterModel?.getFilterValue("type"),
      status: taskFilterModel?.getFilterValue("status"),
      active: taskFilterModel?.getFilterValue("active"),
      tool: taskFilterModel?.getFilterValue("toolIdentifier"),
      search: taskFilterModel?.getFilterValue("search"),
      category: taskFilterModel?.getData("category"),
      owner: taskFilterModel?.getFilterValue("owner"),
      fields: fields,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  taskActions.getTaskById = async (taskId) => {
    const apiUrl = `/tasks/${taskId}`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return taskActions;
}
