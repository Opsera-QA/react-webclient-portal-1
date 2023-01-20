import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";

const dashboardFilterMetadata = {
  type: "Dashboard",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Dashboard Type",
      id: "type",
    },
    {
      label: "Owner",
      id: "owner",
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
      label: "Sort Option",
      id: "sortOption",
    },
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
  ],
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: "name",
    search: "",
    status: "",
    owner: "",
    type: "",
    activeFilters: []
  },
};

export class DashboardFilterModel extends FilterModelBase {
  constructor(getAccessToken) {
    super(dashboardFilterMetadata);
    this.getAccessToken = getAccessToken;
    this.sessionDataKey = sessionHelper.SUPPORTED_STORAGE_SESSION_KEYS.DASHBOARD_FILTER_MODEL_DATA;
    this.enableUrlUpdatesWithQueryParameters();
    this.unpackUrlParameters();
  }

  canSearch = () => {
    return true;
  };

  showPagination = () => {
    return true;
  };

  canSort = () => {
    return true;
  };

  // TODO: Add card view
  canToggleView = () => {
    return false;
  }

  getActiveFilters = () => {
    const activeFilters = [];

    const status = this.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const search = this.getData("search");

    if (hasStringValue(search) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${search}`});
    }

    const owner = this.getData("owner");
    const ownerName = this.getData("ownerName");

    if (hasStringValue(owner) === true && hasStringValue(ownerName) === true) {
      activeFilters.push({filterId: "owner", text: `Owner: ${ownerName}`});
    }

    return activeFilters;
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest Dashboards", value: "oldest"},
        {text: "Newest Dashboards", value: "newest"},
        {text: "Dashboard Name (A-Z a-z)", value: "name"},
        {text: "Dashboard Name (z-a Z-A)", value: "name-descending"},
        {text: "Updated (Latest)", value: "last-updated"},
        {text: "Updated (Earliest)", value: "earliest-updated"},
      ]
    );
  };

  unpackUrlParameters = () => {
    let hasUrlParams = this.unpackCommonUrlParameters();

    const status = sessionHelper.getStoredUrlParameter("status");

    if (hasStringValue(status) === true) {
      hasUrlParams = true;
      this.setData("status", status);
    }

    const taskType = sessionHelper.getStoredUrlParameter("type");

    if (hasStringValue(taskType) === true) {
      hasUrlParams = true;
      this.setData("type", taskType);
    }

    const isFavorite = sessionHelper.getStoredUrlParameter("isFavorite");

    if (hasStringValue(isFavorite) === true) {
      hasUrlParams = true;
      this.setData("isFavorite", isFavorite);
    }

    if (hasUrlParams !== true) {
      this.unpackBrowserStorage();
    }
  };

  unpackBrowserStorage = () => {
    const parsedBrowserStorage = this.unpackCommonBrowserStorageFields();

    if (parsedBrowserStorage) {
      const status = parsedBrowserStorage?.status;

      if (hasStringValue(status) === true) {
        this.setData("status", status);
      }

      const type = parsedBrowserStorage?.type;

      if (hasStringValue(type) === true) {
        this.setData("type", type);
      }

      const isFavorite = parsedBrowserStorage?.isFavorite;

      if (hasStringValue(isFavorite) === true) {
        this.setData("isFavorite", isFavorite);
      }
    }
  };
}

export default DashboardFilterModel;


