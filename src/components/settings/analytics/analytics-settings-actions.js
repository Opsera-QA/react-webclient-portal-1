import baseActions from "utils/actionsBase";
import { axiosApiService } from "api/apiService";

const analyticsActions = {};

// TODO: Remove when all references updated to V2
analyticsActions.fetchProfile = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/profile/settings";
  const response = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

analyticsActions.getAnalyticsSettingsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/analytics/settings`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsActions.getBlueprintFilterData = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/analytics/search/filter`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsActions.getPipelineFilterData = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/pipelines`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsActions.fetchProfileV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/profile/settings";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsActions.areAnalyticsToolsEnabled = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/analytics/profile/enabled-tools-check";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

analyticsActions.getDropdownFilterOptions = async (getAccessToken, cancelTokenSource, type) => {
  const apiUrl = "/analytics/data-entry/filters";
  const postBody = {
    params: {
      type: type
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


analyticsActions.createProfile = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/profile/create";
  const response = await axiosApiService(accessToken)
    .post(apiUrl, {})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

analyticsActions.searchLogsV2 = async (
  getAccessToken,
  cancelTokenSource,
  searchTerm,
  startDate,
  endDate,
  filterType,
  customFilters,
  currentPage,
  pageSize
) => {
  const urlParams = {
    search: searchTerm,
    date: startDate !== 0 && endDate === 0 ? startDate : undefined,
    start: startDate !== 0 && endDate !== 0 ? startDate : undefined,
    end: startDate !== 0 && endDate !== 0 ? endDate : undefined,
    filter: {
      index: filterType,
      customFilter: customFilters,
    },
    page: currentPage,
    size: pageSize,
  };
  let apiUrl = filterType === "blueprint" ? "/analytics/blueprint" : "/analytics/search";

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

analyticsActions.updateProfile = async (getAccessToken, postBody) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/update";
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

export default analyticsActions;
