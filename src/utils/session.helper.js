import { hasStringValue } from "components/common/helpers/string-helpers";

const sessionHelper = {};

sessionHelper.getUrlSearchParameters = () => {
  const url = new URL(window.location.href);
  return url?.searchParams;
};

sessionHelper.getUrlParameterEntries = () => {
  const urlSearchParams = sessionHelper.getUrlSearchParameters();
  return urlSearchParams?.entries();
};

sessionHelper.getUrlParameterKeys = () => {
  const urlSearchParams = sessionHelper.getUrlSearchParameters();
  return urlSearchParams?.keys();
};

sessionHelper.getUrlParameterValues = () => {
  const urlSearchParams = sessionHelper.getUrlSearchParameters();
  return urlSearchParams?.values();
};

sessionHelper.getStoredUrlParameter = (queryParameter) => {
  if (hasStringValue(queryParameter) !== true) {
    return null;
  }

  const urlSearchParams = sessionHelper.getUrlSearchParameters();
  return urlSearchParams.get(queryParameter);
};

sessionHelper.updateUrlWithQueryParameters = (url) => {
  window.history.replaceState(null, null, url?.toString());
};

sessionHelper.replaceStoredUrlParameter = (queryParameter, value) => {
  if (hasStringValue(queryParameter) !== true) {
    return null;
  }

  const url = new URL(window.location.href);
  url.searchParams.delete(queryParameter);

  if (value != null) {
    url.searchParams.set(queryParameter, value);
  }

  return sessionHelper.updateUrlWithQueryParameters(url);
};

sessionHelper.addStoredUrlParameter = (queryParameter, value) => {
  if (hasStringValue(queryParameter) !== true) {
    return null;
  }

  const url = new URL(window.location.href);

  if (value != null) {
    url.searchParams.set(queryParameter, value);
  }
  else {
    url.searchParams.delete(queryParameter);
  }

  return sessionHelper.updateUrlWithQueryParameters(url);
};

sessionHelper.getStoredSessionValueByKey = (sessionKey) => {
  if (hasStringValue(sessionKey) !== true) {
    return null;
  }

  return sessionStorage.getItem(sessionKey);
};

sessionHelper.setStoredSessionValue = (sessionKey, value) => {
  if (hasStringValue(sessionKey) !== true) {
    return null;
  }

  return sessionStorage.setItem(sessionKey, typeof value === "object" ? JSON.stringify(value) : value);
};

sessionHelper.deleteStoredSessionValue = (sessionKey) => {
  if (hasStringValue(sessionKey) !== true) {
    console.error("No session key was included");
    return;
  }

  return sessionStorage.removeItem(sessionKey);
};

sessionHelper.SUPPORTED_STORAGE_SESSION_KEYS = {
  TASK_FILTER_MODEL_DATA: "task-filter-model-data",
  TOOL_FILTER_MODEL_DATA: "tool-filter-model-data",
  PIPELINE_FILTER_MODEL_DATA: "pipeline-filter-model-data",
  DASHBOARD_FILTER_MODEL_DATA: "dashboard-filter-model-data",
};

sessionHelper.clearOutSessionStorage = () => {
  return sessionStorage.clear();
};

// TODO: Make get/set/delete cookie functions
// const getCookie = async (cancelSource = cancelTokenSource) => {
//   setLoading(true);
//   let newToolFilterModel = new ToolFilterModel();
//   try {
//     let storedViewType = cookieHelpers.getCookie("registry", "viewType");
//
//     if (storedViewType != null) {
//       newToolFilterModel.setData("viewType", JSON.parse(storedViewType));
//     }
//   } catch (error) {
//     cookieHelpers.setCookie("registry", "viewType", JSON.stringify(newToolFilterModel?.getData("viewType")));
//     console.error("Error loading cookie. Setting to default");
//     console.error(error);
//   } finally {
//     await loadData(newToolFilterModel, cancelSource);
//   }
// };

export default sessionHelper;
