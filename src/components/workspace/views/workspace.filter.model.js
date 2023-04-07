import FilterModelBase from "core/data_model/filterModel.base";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import TagParsingHelper from "@opsera/persephone/helpers/data/tags/tagParsing.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
    {
      label: "Tag",
      id: "tag",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Sort Option",
      id: "sortOption",
    },
  ],
  newObjectFields: {
    pageSize: 100,
    currentPage: 1,
    totalCount: 0,
    activeFilters: [],
    viewType: "list",
    type: "all",
    tag: undefined,
    active: "",
    sortOption: "name",
  },
};

export default class WorkspaceFilterModel extends FilterModelBase {
  constructor() {
    super(workspaceFilterMetadata);
    this.sessionDataKey = sessionHelper.SUPPORTED_SESSION_STORAGE_KEYS.WORKSPACE_FILTER_MODEL_DATA;
    this.enableUrlUpdatesWithQueryParameters();
    this.unpackUrlParameters();
  }

  canToggleView = () => {
    return true;
  };

  canSearch = () => {
    return true;
  };

  showPagination = () => {
    return true;
  };

  canSort = () => {
    return true;
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest Items", value: "oldest"},
        {text: "Newest Items", value: "newest"},
        {text: "Name (A-Z)", value: "name"},
        {text: "Name (Z-A)", value: "name-descending"},
        {text: "Updated (Latest)", value: "last-updated"},
        {text: "Updated (Earliest)", value: "earliest-updated"},
      ]
    );
  };

  getActiveFilters = () => {
    const activeFilters = [];

    const active = this.getData("active");

    if (hasStringValue(active) === true) {
      activeFilters.push({filterId: "active", text: `Active: ${capitalizeFirstLetter(active)}`});
    }

    const tag = TagParsingHelper.parseTagFilter(this.getData("tag"));

    if (tag) {
      activeFilters.push({ filterId: "tag", text: `Tag: ${capitalizeFirstLetter(tag.type)}: ${tag.value}` });
    }

    const ownerName = this.getData("ownerName");
    const owner = this.getData("owner");

    if (hasStringValue(owner) === true && hasStringValue(ownerName) === true) {
      activeFilters.push({filterId: "owner", text: `Owner: ${ownerName}`});
    }

    const searchKeyword = this.getData("search");

    if (hasStringValue(searchKeyword) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchKeyword}`});
    }

    return activeFilters;
  };

  unpackUrlParameters = () => {
    let hasUrlParams = this.unpackCommonUrlParameters();

    const type = sessionHelper.getStoredUrlParameter("type");

    if (hasStringValue(type) === true) {
      hasUrlParams = true;
      this.setData("type", type);
    }

    const tag = TagParsingHelper.parseTagFilter(sessionHelper.getStoredUrlParameter("tag"));

    if (tag) {
      hasUrlParams = true;
      this.setData("tag", tag);
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


