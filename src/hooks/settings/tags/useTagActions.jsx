import useApiService from "hooks/api/service/useApiService";

// TODO: Not all of these have been tested (it was copied from the old actions file), so please verify they were before swapping them out.
export default function useTagActions() {
  const apiService = useApiService();
  const tagActions = {};

  tagActions.getEstimatedTagCountV2 = async (type) => {
    const apiUrl = `/tags/count`;
    const urlParams = {
      type: type,
    };

    return await apiService.handleApiGetRequest(apiUrl, urlParams);
  };

  tagActions.deleteTag = async (tagId) => {
    const apiUrl = `/tags/${tagId}`;
    return await apiService.handleApiDeleteRequest(apiUrl);
  };

  tagActions.updateTag = async (tagDataDto) => {
    const postBody = {
      ...tagDataDto.getPersistData(),
    };
    const apiUrl = `/tags/${tagDataDto.getData("_id")}/`;
    return await apiService.handleApiPutRequest(apiUrl, postBody);
  };

  tagActions.getAllTagsV2 = async (status = "active", usage = false) => {
    const apiUrl = "/tags";
    const urlParams = {
      size: 10000,
      status: status,
      usage: usage
    };
    return await apiService.handleApiGetRequest(apiUrl, urlParams);
  };

  tagActions.doesTagExistWithTypeAndValue = async (type, value) => {
    const apiUrl = "/tags/find";
    const queryParameters = {
      type: type,
      value: value,
    };
    return await apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  tagActions.getPlatformTags = async () => {
    const apiUrl = "/tags/platform";
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  tagActions.getTags = async (tagFilterModel) => {
    const apiUrl = "/tags";
    const urlParams = {
      sort: tagFilterModel?.getFilterValue("sortOption"),
      size: tagFilterModel?.getFilterValue("pageSize"),
      page: tagFilterModel?.getFilterValue("currentPage"),
      type: tagFilterModel?.getFilterValue("type"),
      status: tagFilterModel?.getFilterValue("status"),
      search: tagFilterModel?.getFilterValue("search")
    };

    return await apiService.handleApiGetRequest(apiUrl, urlParams);
  };

  tagActions.getProjectTags = async () => {
    const apiUrl = "/tags";
    const urlParams = {
      size: 10000,
      page: 1,
      sort: "type",
      type: "project"
    };
    return await apiService.handleApiGetRequest(apiUrl, urlParams);
  };

  tagActions.getVisibleTags = async () => {
    const apiUrl = "/tags?status=active";
    const urlParams = {
      size: 100,
      page: 1,
    };
    return await apiService.handleApiGetRequest(apiUrl, urlParams);
  };

  tagActions.getTagById = async (tagId) => {
    const apiUrl = `/tags/${tagId}`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  tagActions.createTag = async (tagModel) => {
    const postBody = {
      ...tagModel.getPersistData(),
    };
    const apiUrl = "/tags";
    return await apiService.handleApiPostRequest(apiUrl, postBody);
  };

  tagActions.getRelevantPipelinesV2 = async (tags) => {
    const apiUrl = `/reports/pipelines/tags`;
    return await apiService.handleApiPostRequest(apiUrl, tags);
  };

  tagActions.getRelevantToolsV2 = async (tags) => {
    const apiUrl = `/reports/tools/tags`;
    return await apiService.handleApiPostRequest(apiUrl, tags);
  };

  tagActions.getRelevantDashboardsV2 = async (tags) => {
    const apiUrl = `/reports/dashboards/tags`;
    return await apiService.handleApiPostRequest(apiUrl, tags);
  };

  // TODO: Move to Tag Subscriptions hook before wiring up
  tagActions.subscribeToTag = async (tagId) => {
    const apiUrl = `/tags/${tagId}/subscribe`;
    return await apiService.handleApiPostRequest(apiUrl);
  };

  tagActions.unsubscribeFromTag = async (tagId) => {
    const apiUrl = `/tags/${tagId}/unsubscribe`;
    return await apiService.handleApiDeleteRequest(apiUrl);
  };

  tagActions.isSubscribed = async (tagId) => {
    const apiUrl = `/tags/${tagId}/is_subscribed`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  tagActions.getSubscribedTags = async () => {
    const apiUrl = `/tags/subscriptions/tags`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  tagActions.getSubscribedTagIds = async () => {
    const apiUrl = `/tags/subscriptions/ids`;
    return await apiService.handleApiGetRequest(apiUrl);
  };

  return tagActions;
}
