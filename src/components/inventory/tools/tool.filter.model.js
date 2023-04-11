import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import { toolHelper } from "components/inventory/tools/tool.helper";

const toolFilterMetadata = {
  idProperty: "_id",
  type: "Tool",
  fields: [
    {
      label: "Active Status",
      id: "status",
    },
    {
      label: "Tool Identifier",
      id: "toolIdentifier",
    },
    {
      label: "Tool Identifier",
      id: "toolIdentifierName",
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
      label: "Tool Owner",
      id: "owner"
    },
    {
      label: "Owner",
      id: "ownerName"
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
    pageSize: 50,
    currentPage: 1,
    totalCount: 0,
    sortOption: "name",
    search: "",
    status: "",
    toolIdentifier: "",
    toolIdentifierName: "",
    owner: "",
    ownerName: "",
    tag: "",
    activeFilters: [],
    viewType: "card",
  },
};

export class ToolFilterModel extends FilterModelBase {
  constructor(useUrlParameters = true) {
    super(toolFilterMetadata);

    if (useUrlParameters !== false) {
      this.sessionDataKey = sessionHelper.SUPPORTED_SESSION_STORAGE_KEYS.TOOL_FILTER_MODEL_DATA;
      this.enableUrlUpdatesWithQueryParameters();
      this.unpackUrlParameters();
    }
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

    const toolIdentifier =  this.getData("toolIdentifier");
    const toolIdentifierName =  this.getData("toolIdentifierName");

    if (hasStringValue(toolIdentifierName) === true && hasStringValue(toolIdentifier) === true) {
      activeFilters.push({filterId: "toolIdentifier", text: `Tool: ${toolIdentifierName}`});
    }

    const tag = this.getData("tag");

    if (hasStringValue(tag) === true) {
      const tagArray = tag.split(":");

      if (Array.isArray(tagArray) && tagArray.length === 2) {
        activeFilters.push({ filterId: "tag", text: `Tag: ${capitalizeFirstLetter(tagArray[0])}: ${tagArray[1]}` });
      }
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

  canSort = () => {
    return true;
  };

  canToggleView = () => {
    return true;
  }

  getDetailViewLink = (toolId) => {
    return toolHelper.getDetailViewLink(toolId);
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest Tools", value: "oldest"},
        {text: "Newest Tools", value: "newest"},
        {text: "Tool Name (A-Z a-z)", value: "name"},
        {text: "Tool Name (z-a Z-A)", value: "name-descending"},
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

    const toolIdentifier = sessionHelper.getStoredUrlParameter("toolIdentifier");
    const toolIdentifierName = sessionHelper.getStoredUrlParameter("toolIdentifierName");

    if (hasStringValue(toolIdentifier) === true && hasStringValue(toolIdentifierName) === true) {
      hasUrlParams = true;
      this.setData("toolIdentifier", toolIdentifier);
      this.setData("toolIdentifierName", toolIdentifierName);
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

      const toolIdentifier = parsedBrowserStorage?.toolIdentifier;
      const toolIdentifierName = parsedBrowserStorage?.toolIdentifierName;

      if (hasStringValue(toolIdentifier) === true && hasStringValue(toolIdentifierName) === true) {
        this.setData("toolIdentifier", toolIdentifier);
        this.setData("toolIdentifierName", toolIdentifierName);
      }
    }
  };
}

export default ToolFilterModel;


