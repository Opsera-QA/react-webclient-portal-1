import useApiService from "hooks/api/service/useApiService";

export default function useOrganizationActions() {
  const apiService = useApiService();
  const organizationActions = {};

  organizationActions.getAllOrganizations = async (status = "active") => {
    const apiUrl = "/organization";
    const urlParams = {
      size: 10000,
      status: status,
    };

    return await apiService.handleApiGetRequest(apiUrl, urlParams);
  };

  organizationActions.getOrganizations = async (organizationFilterDto) => {
    let sortOption = organizationFilterDto?.getData("sortOption");
    let status = organizationFilterDto.getData("status");
    const apiUrl = "/organization";
    const urlParams = {
      sort: sortOption ? sortOption.value : undefined,
      size: organizationFilterDto?.getData("pageSize"),
      page: organizationFilterDto?.getData("currentPage"),
      status: status ? status.value : undefined,
      search: organizationFilterDto?.getData("search")
    };

    return await apiService.handleApiGetRequest(apiUrl, urlParams);
  };

  organizationActions.getOrganizationById = async (organizationId) => {
    const apiUrl = `/organization/${organizationId}`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  organizationActions.getOrganizationNamesForIds = async (organizationIds) => {
    const apiUrl = `/organization/names`;
    const queryParameters = {
      organizationIds: organizationIds,
    };
    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  organizationActions.createOrganization = async (organizationModel) => {
    let postBody = {
      ...organizationModel.getPersistData(),
    };
    const apiUrl = "/organization";
    return await apiService.handleApiPostRequest(apiUrl, postBody);
  };

  organizationActions.updateOrganization = async (organizationModel) => {
    let postBody = {
      ...organizationModel.getPersistData(),
    };
    const apiUrl = `/organization/${organizationModel.getData("_id")}/`;
    return await apiService.handleApiPostRequest(apiUrl, postBody);
  };

  organizationActions.deleteOrganization = async (organizationId) => {
    const apiUrl = `/organization/${organizationId}`;
    return await apiService.handleApiDeleteRequest(apiUrl);
  };

  return organizationActions;
}
