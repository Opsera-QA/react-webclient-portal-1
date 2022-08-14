import FilterModelBase from "core/data_model/filterModel.base";
import { hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";

const workspaceFilterMetadata = {
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Current Page",
      id: "currentPage",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Total Count",
      id: "totalCount",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
    {
      label: "View Type",
      id: "viewType",
    },
  ],
  newObjectFields: {
    pageSize: 100,
    currentPage: 1,
    totalCount: 0,
    activeFilters: [],
    viewType: "list",
    type: "pipelines",
  },
};

export default class WorkspaceFilterModel extends FilterModelBase {
  constructor() {
    super(workspaceFilterMetadata);
    this.sessionDataKey = sessionHelper.SUPPORTED_STORAGE_SESSION_KEYS.WORKSPACE_FILTER_MODEL_DATA;
    this.enableUrlUpdatesWithQueryParameters();
    this.unpackUrlParameters();
  }

  canToggleView = () => {
    return true;
  }

  unpackUrlParameters = () => {
    let hasUrlParams = this.unpackCommonUrlParameters();

    const type = sessionHelper.getStoredUrlParameter("type");

    if (hasStringValue(type) === true) {
      hasUrlParams = true;
      this.setData("type", type);
    }

    if (hasUrlParams !== true) {
      this.unpackBrowserStorage();
    }
  };

  unpackBrowserStorage = () => {
    const parsedBrowserStorage = this.unpackCommonBrowserStorageFields();

    if (parsedBrowserStorage) {
      const type = parsedBrowserStorage?.type;

      if (hasStringValue(type) === true) {
        this.setData("type", type);
      }
    }
  };
}


