import FilterModelBase from "core/data_model/filterModel.base";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import TagParsingHelper from "@opsera/persephone/helpers/data/tags/tagParsing.helper";
import pipelineInstructionsTypeConstants
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructionsType.constants";

const pipelineInstructionsFilterMetadata = {
  fields: [
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
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Tag",
      id: "tag",
    },
    {
      label: "Type",
      id: "type",
    },
  ],
  newObjectFields: {
    pageSize: 100,
    currentPage: 1,
    owner: "",
    tag: undefined,
    type: "",
    search: "",
    activeFilters: []
  },
};

export class PipelineInstructionsFilterModel extends FilterModelBase {
  constructor() {
    super(pipelineInstructionsFilterMetadata);
  }

  canSearch = () => {
    return true;
  }

  getActiveFilters = () => {
    const activeFilters = [];

    const tag = TagParsingHelper.parseTag(this.getData("tag"));

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

    const type = this.getData("type");

    if (hasStringValue(type) === true) {
      activeFilters.push({filterId: "type", text: `Type: ${pipelineInstructionsTypeConstants.getPipelineInstructionTypeLabel(type)}`});
    }

    return activeFilters;
  };

  showPagination = () => {
    return false;
  }
}

export default PipelineInstructionsFilterModel;


