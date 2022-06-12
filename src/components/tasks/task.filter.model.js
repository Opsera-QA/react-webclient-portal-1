import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import { getTaskTypeLabel } from "components/tasks/task.types";
import sessionHelper from "utils/session.helper";

const taskFilterMetadata = {
  type: "Task",
  fields: [
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Type",
      id: "type",
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
      label: "Owner",
      id: "owner",
    },
    {
      label: "Tag",
      id: "tag",
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
    pageSize: 100,
    currentPage: 1,
    sortOption: {text: "Name", value: "name"},
    search: "",
    activeFilters: [],
    viewType: "list",
    category: "",
    status: "",
    active: "",
  },
};

export class TaskFilterModel extends FilterModelBase {
  constructor(getAccessToken, cancelTokenSource, loadData) {
    super(taskFilterMetadata);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.sessionDataKey = "task-filter-model-data";
    this.enableUrlUpdatesWithQueryParameters();
    this.unpackUrlParameters();
  }

  canSearch = () => {
    return true;
  };

  showPagination = () => {
    return true;
  };

  getActiveFilters = () => {
    const activeFilters = [];

    const status = this.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const active = this.getData("active");

    if (hasStringValue(active) === true) {
      activeFilters.push({filterId: "active", text: `Active: ${capitalizeFirstLetter(active)}`});
    }

    const type = this.getData("type");

    if (hasStringValue(type) === true) {
      activeFilters.push({filterId: "type", text: `Type: ${getTaskTypeLabel(type)}`});
    }

    const tag = this.getData("tag");

    if (hasStringValue(tag) === true) {
      const tagArray = tag.split(":");

      if (Array.isArray(tagArray) && tagArray.length === 2) {
        activeFilters.push({ filterId: "tag", text: `Tag: ${capitalizeFirstLetter(tagArray[0])}: ${tagArray[1]}` });
      }
    }

    const searchKeyword = this.getData("search");

    if (hasStringValue(searchKeyword) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchKeyword}`});
    }

    const ownerName = this.getData("ownerName");
    const owner = this.getData("owner");

    if (hasStringValue(owner) === true && hasStringValue(ownerName) === true) {
      activeFilters.push({filterId: "owner", text: `Owner: ${ownerName}`});
    }

    return activeFilters;
  };

  canSort = () => {
    return true;
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest Tasks", value: "oldest"},
        {text: "Newest Tasks", value: "newest"},
        {text: "Task Name (A-Za-z)", value: "name"},
        {text: "Task Name (z-aZ-A)", value: "name"},
        {text: "Last Updated", value: "lastupdated"},
      ]
    );
  };

  canToggleView = () => {
    return true;
  }

  unpackUrlParameters = () => {
    let hasUrlParams = this.unpackCommonUrlParameters();

    const status = sessionHelper.getStoredUrlParameter("status");

    if (hasStringValue(status) === true) {
      hasUrlParams = true;
      this.setData("status", status);
    }

    const category = sessionHelper.getStoredUrlParameter("category");

    if (hasStringValue(category) === true) {
      hasUrlParams = true;
      this.setData("category", category);
    }

    const taskType = sessionHelper.getStoredUrlParameter("type");

    if (hasStringValue(taskType) === true) {
      hasUrlParams = true;
      this.setData("type", taskType);
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

      const category = parsedBrowserStorage?.category;

      if (hasStringValue(category) === true) {
        this.setData("category", category);
      }

      const type = parsedBrowserStorage?.type;

      if (hasStringValue(type) === true) {
        this.setData("type", type);
      }
    }
  };
}

export default TaskFilterModel;


