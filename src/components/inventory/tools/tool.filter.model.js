import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { numberHelpers } from "components/common/helpers/number/number.helpers";

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
    owner: "",
    tag: "",
    activeFilters: [],
    viewType: "card",
  },
};

export class ToolFilterModel extends FilterModelBase {
  constructor() {
    super(toolFilterMetadata);
    this.sessionDataKey = "tool-filter-model-data";
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
    let activeFilters = [];

    const status = this.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const toolIdentifier =  this.getData("toolIdentifier");
    const toolIdentifierName =  this.getData("toolIdentifierName");

    if (hasStringValue(toolIdentifierName) === true && hasStringValue(toolIdentifier) === true) {
      activeFilters.push({filterId: "toolIdentifierName", text: `Tool: ${toolIdentifierName}`});
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

  getDetailViewLink = (toolId) => {
    return `/inventory/tools/details/${toolId}`;
  };

  getSortOptions = () => {
    return (
      [
        {text: "Oldest", value: "oldest"},
        {text: "Newest", value: "newest"},
        {text: "Name", value: "name"},
        {text: "Last Updated", value: "lastupdated"},
      ]
    );
  };

  unpackUrlParameters = () => {
    let hasUrlParams = false;

    const sortOption = sessionHelper.getStoredUrlParameter("sortOption");

    if (hasStringValue(sortOption) === true) {
      hasUrlParams = true;
      this.setData("sortOption", sortOption);
    }

    const pageSize =  sessionHelper.getStoredUrlParameter("pageSize");

    if (numberHelpers.isNumberGreaterThan(0, pageSize)) {
      this.setData("pageSize", pageSize);
    }

    const currentPage = sessionHelper.getStoredUrlParameter("currentPage");

    if (numberHelpers.isNumberGreaterThan(0, currentPage)) {
      hasUrlParams = true;
      this.setData("currentPage", currentPage);
    }

    const search = sessionHelper.getStoredUrlParameter("search");

    if (hasStringValue(search) === true) {
      hasUrlParams = true;
      this.setData("search", search);
    }

    const viewType = sessionHelper.getStoredUrlParameter("viewType");

    if (hasStringValue(viewType) === true) {
      hasUrlParams = true;
      this.setData("viewType", viewType);
    }

    const status = sessionHelper.getStoredUrlParameter("status");

    if (hasStringValue(status) === true) {
      hasUrlParams = true;
      this.setData("status", status);
    }

    const toolIdentifier = sessionHelper.getStoredUrlParameter("toolIdentifier");

    if (hasStringValue(toolIdentifier) === true) {
      hasUrlParams = true;
      this.setData("toolIdentifier", toolIdentifier);
    }

    const toolIdentifierName = sessionHelper.getStoredUrlParameter("toolIdentifierName");

    if (hasStringValue(toolIdentifierName) === true) {
      hasUrlParams = true;
      this.setData("toolIdentifierName", toolIdentifierName);
    }

    const tag = sessionHelper.getStoredUrlParameter("tag");

    if (hasStringValue(tag) === true) {
      hasUrlParams = true;
      this.setData("tag", tag);
    }

    const owner = sessionHelper.getStoredUrlParameter("owner");

    if (hasStringValue(owner) === true) {
      hasUrlParams = true;
      this.setData("owner", owner);
    }

    if (hasUrlParams !== true) {
      this.unpackBrowserStorage();
    }
  };

  unpackBrowserStorage = () => {
    const browserStorage = sessionHelper.getStoredSessionValueByKey(this.sessionDataKey);
    const parsedBrowserStorage = dataParsingHelper.parseJson(browserStorage);

    if (parsedBrowserStorage) {
      const pageSize = parsedBrowserStorage?.pageSize;

      if (numberHelpers.isNumberGreaterThan(0, pageSize)) {
        this.setData("pageSize", pageSize);
      }

      const currentPage = parsedBrowserStorage?.currentPage;

      if (numberHelpers.isNumberGreaterThan(0, currentPage)) {
        this.setData("currentPage", currentPage);
      }

      const sortOption = parsedBrowserStorage?.sortOption;

      if (hasStringValue(sortOption) === true) {
        this.setData("sortOption", sortOption);
      }

      const search = parsedBrowserStorage?.search;

      if (hasStringValue(search) === true) {
        this.setData("search", search);
      }

      const viewType = parsedBrowserStorage?.viewType;

      if (hasStringValue(viewType) === true) {
        this.setData("viewType", viewType);
      }

      const status = parsedBrowserStorage?.status;

      if (hasStringValue(status) === true) {
        this.setData("status", status);
      }

      const toolIdentifier = parsedBrowserStorage?.toolIdentifier;

      if (hasStringValue(toolIdentifier) === true) {
        this.setData("toolIdentifier", toolIdentifier);
      }

      const toolIdentifierName = parsedBrowserStorage?.toolIdentifierName;

      if (hasStringValue(toolIdentifierName) === true) {
        this.setData("toolIdentifierName", toolIdentifierName);
      }

      const tag = parsedBrowserStorage?.tag;

      if (hasStringValue(tag) === true) {
        this.setData("tag", tag);
      }

      const owner = parsedBrowserStorage?.owner;

      if (hasStringValue(owner) === true) {
        this.setData("owner", owner);
      }
    }
  };
}

export default ToolFilterModel;


