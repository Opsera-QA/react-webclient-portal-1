import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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

  const parsedObjectValue = DataParsingHelper.parseObject(value);
  const parsedStringValue = DataParsingHelper.parseString(value);

  if (parsedObjectValue) {
    url.searchParams.set(queryParameter, JSON.stringify(parsedObjectValue));
  } else if (parsedStringValue != null) {
    url.searchParams.set(queryParameter, value);
  }

  sessionHelper.updateUrlWithQueryParameters(url);
};

sessionHelper.addStoredUrlParameter = (queryParameter, value) => {
  if (hasStringValue(queryParameter) !== true) {
    return null;
  }

  const url = new URL(window.location.href);
  const parsedObjectValue = DataParsingHelper.parseObject(value);
  const parsedStringValue = DataParsingHelper.parseString(value);

  if (parsedObjectValue) {
    url.searchParams.set(queryParameter, JSON.stringify(parsedObjectValue));
  } else if (parsedStringValue != null) {
    url.searchParams.set(queryParameter, value);
  } else {
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
  WORKSPACE_FILTER_MODEL_DATA: "workspace-filter-model-data",
  TASK_FILTER_MODEL_DATA: "task-filter-model-data",
  TOOL_FILTER_MODEL_DATA: "tool-filter-model-data",
  PIPELINE_FILTER_MODEL_DATA: "pipeline-filter-model-data",
  DASHBOARD_FILTER_MODEL_DATA: "dashboard-filter-model-data",
  SIDEBAR_COLLAPSED: "SIDEBAR_COLLAPSED",
};

sessionHelper.SAVED_STORAGE_SESSION_KEYS = [
  sessionHelper.SUPPORTED_STORAGE_SESSION_KEYS.SIDEBAR_COLLAPSED,
];

sessionHelper.clearOutSessionStorage = () => {
  const sessionKeyIdentifiers = Object.values(sessionHelper.SUPPORTED_STORAGE_SESSION_KEYS);

  sessionKeyIdentifiers.forEach((sessionKey) => {
    if (sessionHelper.SAVED_STORAGE_SESSION_KEYS.includes(sessionKey) === true) {
      return;
    }

    sessionHelper.deleteStoredSessionValue(sessionKey);
  });
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
