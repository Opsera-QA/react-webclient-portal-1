import useApiService from "hooks/api/service/useApiService";

export default function useRegistryToolActions() {
  const apiService = useApiService();
  const registryToolActions = {};

  registryToolActions.getRegistryTools = async (
    toolFilterModel,
    fields,
 ) => {
    const apiUrl = `/registry/configs/v2`;
    const queryParameters = {
      sortOption: toolFilterModel?.getData("sortOption"),
      currentPage: toolFilterModel?.getData("currentPage"),
      pageSize: toolFilterModel?.getData("pageSize"),
      toolIdentifier: toolFilterModel?.getData("toolIdentifier"),
      tag: toolFilterModel?.getData("tag"),
      active: toolFilterModel?.getFilterValue("status"),
      search: toolFilterModel?.getFilterValue("search"),
      owner: toolFilterModel?.getFilterValue("owner"),
      fields: fields,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return registryToolActions;
}
