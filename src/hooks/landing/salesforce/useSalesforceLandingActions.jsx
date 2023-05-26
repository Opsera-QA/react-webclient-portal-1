import useApiService from "hooks/api/service/useApiService";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useSalesforceLandingActions() {
  const apiService = useApiService();
  const salesforceLandingActions = {};

  salesforceLandingActions.getMyWorkspaceWorkflowResources = async (
    workspaceFilterModel,
    fields,
    active,
  ) => {
    const apiUrl = `/landing/salesforce/workflows`;

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

  salesforceLandingActions.getSubscribedWorkflowResources = async (
    workspaceFilterModel,
    fields,
    active,
  ) => {
    const apiUrl = `/landing/salesforce/workflows/subscribed`;

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

  salesforceLandingActions.getRecentWorkflowResources = async (
    workspaceFilterModel,
    fields,
    active,
  ) => {
    const apiUrl = `/landing/salesforce/workflows/recent`;

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

  salesforceLandingActions.getWorkspaceWorkflowResourcesByIds = async (
    idArray,
  ) => {
    const apiUrl = `/landing/salesforce/workflows/ids`;

    const queryParameters = {
      idArray: DataParsingHelper.parseArray(idArray, []),
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  return salesforceLandingActions;
}
