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
  const parsedNumberValue = DataParsingHelper.parseNumber(value);

  if (parsedObjectValue) {
    url.searchParams.set(queryParameter, JSON.stringify(parsedObjectValue));
  } else if (parsedStringValue != null) {
    url.searchParams.set(queryParameter, value);
  } else if (parsedNumberValue != null) {
    url.searchParams.set(queryParameter, String(value));
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
  const parsedNumberValue = DataParsingHelper.parseNumber(value);

  if (parsedObjectValue) {
    url.searchParams.set(queryParameter, JSON.stringify(parsedObjectValue));
  } else if (parsedStringValue != null) {
    url.searchParams.set(queryParameter, value);
  } else if (parsedNumberValue != null) {
    url.searchParams.set(queryParameter, String(value));
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

sessionHelper.SUPPORTED_SESSION_STORAGE_KEYS = {
  WORKSPACE_FILTER_MODEL_DATA: "workspace-filter-model-data",
  TASK_FILTER_MODEL_DATA: "task-filter-model-data",
  TOOL_FILTER_MODEL_DATA: "tool-filter-model-data",
  PIPELINE_FILTER_MODEL_DATA: "pipeline-filter-model-data",
  DASHBOARD_FILTER_MODEL_DATA: "dashboard-filter-model-data",
};

sessionHelper.clearOutSessionStorage = () => {
  sessionStorage.clear();
};

sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS = {
  LANDING_SCREEN_WORKFLOW_WIDGET_CURRENT_VIEW: "landing_screen_workflow_widget_current_view",
  COLLAPSE_SIDEBAR: "collapse_sidebar",
};

sessionHelper.getCookie = (cookieStorageKey) => {
  return localStorage.getItem(cookieStorageKey);
};

sessionHelper.setCookie = (cookieName, value) => {
  localStorage.setItem(cookieName, value);
};

sessionHelper.deleteCookie = (cookieName) => {
  localStorage.removeItem(cookieName);
};

export default sessionHelper;
