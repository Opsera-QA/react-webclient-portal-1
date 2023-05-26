import useApiService from "hooks/api/service/useApiService";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useSoftwareDevelopmentLandingActions() {
  const apiService = useApiService();
  const softwareDevelopmentLandingActions = {};

  softwareDevelopmentLandingActions.getMyWorkspaceWorkflowResources = async (
    workspaceFilterModel,
    fields,
    active,
  ) => {
    const apiUrl = `/landing/software-development/workflows`;

    const queryParameters = {
      sortOption: workspaceFilterModel?.getData("sortOption"),
      currentPage: workspaceFilterModel?.getData("currentPage"),
      pageSize: workspaceFilterModel?.getData("pageSize"),
      toolIdentifier: workspaceFilterModel?.getData("toolIdentifier"),
      tag: workspaceFilterModel?.getData("tag"),
      active: active,
      search: workspaceFilterModel?.getFilterValue("search"),
      owner: workspaceFilterModel?.getFilterValue("owner"),
      fields: fields,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
      true,
    );
  };

  softwareDevelopmentLandingActions.getSubscribedWorkflowResources = async (
    workspaceFilterModel,
    fields,
    active,
  ) => {
    const apiUrl = `/landing/software-development/workflows/subscribed`;

    const queryParameters = {
      sortOption: workspaceFilterModel?.getData("sortOption"),
      currentPage: workspaceFilterModel?.getData("currentPage"),
      pageSize: workspaceFilterModel?.getData("pageSize"),
      toolIdentifier: workspaceFilterModel?.getData("toolIdentifier"),
      tag: workspaceFilterModel?.getData("tag"),
      active: active,
      search: workspaceFilterModel?.getFilterValue("search"),
      owner: workspaceFilterModel?.getFilterValue("owner"),
      fields: fields,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
      true,
    );
  };

  softwareDevelopmentLandingActions.getRecentWorkflowResources = async (
    workspaceFilterModel,
    fields,
    active,
  ) => {
    const apiUrl = `/landing/software-development/workflows/recent`;

    const queryParameters = {
      sortOption: workspaceFilterModel?.getData("sortOption"),
      currentPage: workspaceFilterModel?.getData("currentPage"),
      pageSize: workspaceFilterModel?.getData("pageSize"),
      toolIdentifier: workspaceFilterModel?.getData("toolIdentifier"),
      tag: workspaceFilterModel?.getData("tag"),
      active: active,
      search: workspaceFilterModel?.getFilterValue("search"),
      owner: workspaceFilterModel?.getFilterValue("owner"),
      fields: fields,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
      true,
    );
  };

  softwareDevelopmentLandingActions.getWorkspaceWorkflowResourcesByIds = async (
    idArray,
  ) => {
    const apiUrl = `/landing/software-development/workflows/ids`;

    const queryParameters = {
      idArray: DataParsingHelper.parseArray(idArray, []),
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return softwareDevelopmentLandingActions;
}
