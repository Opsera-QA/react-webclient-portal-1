import FilterModelBase from "core/data_model/filterModel.base";
import sessionHelper from "utils/session.helper";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import TagParsingHelper from "@opsera/persephone/helpers/data/tags/tagParsing.helper";

const pipelineFilterMetadata = {
  type: "Pipeline",
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
      label: "Pipeline Step",
      id: "tool_identifier",
    },
    {
      label: "Pipeline Tag",
      id: "tag",
    },
    {
      label: "Pipeline Step Tag",
      id: "stepTag",
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
    pageSize: 25,
    currentPage: 1,
    sortOption: "last-updated",
    search: "",
    activeFilters: [],
    viewType: "list",
    category: "",
    tag: "",
    stepTag: "",
    type: "",
    status: "",
    active: "",
    tool_identifier: "",
    tool_identifier_name: "",
  },
};

export class PipelineFilterModel extends FilterModelBase {
  constructor(
    useUrlParameters = true,
  ) {
    super(pipelineFilterMetadata);

    if (useUrlParameters === true) {
      this.sessionDataKey = sessionHelper.SUPPORTED_SESSION_STORAGE_KEYS.PIPELINE_FILTER_MODEL_DATA;
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

  canSort = () => {
    return true;
  };

  canToggleView = () => {
    return true;
  };

  getDetailViewLink = (pipelineId) => {
    return pipelineHelper.getDetailViewLink(pipelineId);
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

    const tag = this.getData("tag");
    const parsedTag = TagParsingHelper.parseTagFilter(tag);

    if (parsedTag) {
      activeFilters.push({ filterId: "tag", text: `Pipeline Tag: ${capitalizeFirstLetter(parsedTag?.type)}: ${parsedTag?.value}` });
    }

    const stepTag = this.getData("stepTag");
    const parsedStepTag = TagParsingHelper.parseTagFilter(stepTag);

    if (parsedStepTag) {
      activeFilters.push({ filterId: "stepTag", text: `Pipeline Step Tag: ${capitalizeFirstLetter(parsedStepTag?.type)}: ${parsedStepTag?.value}` });
    }

    const toolIdentifier = DataParsingHelper.parseString(this.getData("tool_identifier"));
    const toolIdentifierName = DataParsingHelper.parseString(this.getData("tool_identifier_name"));

    if (toolIdentifier && toolIdentifierName) {
      activeFilters.push({ filterId: "tool_identifier", text: `Pipeline Step: ${toolIdentifierName}`});
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

  getSortOptions = () => {
    return (
      [
        {text: "Oldest Pipelines", value: "oldest"},
        {text: "Newest Pipelines", value: "newest"},
        {text: "Pipeline Name (A-Za-z)", value: "name"},
        {text: "Pipeline Name (z-aZ-A)", value: "name-descending"},
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

    const toolIdentifier = sessionHelper.getStoredUrlParameter("tool_identifier");
    const toolIdentifierName = sessionHelper.getStoredUrlParameter("tool_identifier_name");

    if (toolIdentifier && toolIdentifierName) {
      this.setData("tool_identifier", toolIdentifier);
      this.setData("tool_identifier_name", toolIdentifierName);
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

      const toolIdentifier = DataParsingHelper.parseNestedString(parsedBrowserStorage, "tool_identifier");
      const toolIdentifierName = DataParsingHelper.parseNestedString(parsedBrowserStorage, "tool_identifier_name");

      if (toolIdentifier && toolIdentifierName) {
        this.setData("tool_identifier", toolIdentifier);
        this.setData("tool_identifier_name", toolIdentifierName);
      }
    }
  };
}

export default PipelineFilterModel;


