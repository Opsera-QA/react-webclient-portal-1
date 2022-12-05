import FilterModelBase from "core/data_model/filterModel.base";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import TagParsingHelper from "@opsera/persephone/helpers/data/tags/tagParsing.helper";
import pipelineInstructionsTypeConstants
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructionsType.constants";
import pipelineInstructionsStatusConstants
  from "@opsera/definitions/constants/pipelines/instructions/status/pipelineInstructionsStatus.constants";
import {hasDateValue} from "components/common/helpers/date/date.helpers";
import {getFormattedDate} from "components/common/fields/date/DateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Release Date",
      id: "release_date",
    },
    {
      label: "Release Date Range",
      id: "release_date_range",
    },
  ],
  newObjectFields: {
    pageSize: 100,
    currentPage: 1,
    owner: "",
    tag: undefined,
    type: "",
    search: "",
    status: "",
    release_date: undefined,
    release_date_range: undefined,
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

    const status = this.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${pipelineInstructionsStatusConstants.getPipelineInstructionStatusLabel(status)}`});
    }

    const releaseDate = this.getData("release_date");

    if (hasDateValue(releaseDate) === true) {
      activeFilters.push({filterId: "release_date", text: `Release Date: ${getFormattedDate(releaseDate)}`});
    }

    const releaseDateRange = DataParsingHelper.parseObject(this.getData("release_date_range"));

    if (releaseDateRange) {
      const parsedStartDate = DataParsingHelper.parseDate(releaseDateRange.startDate);
      const parsedEndDate = DataParsingHelper.parseDate(releaseDateRange.endDate);

      if (parsedStartDate && parsedEndDate) {
        activeFilters.push({filterId: "release_date_range", text: `Release Date: ${getFormattedDate(parsedStartDate)} to ${getFormattedDate(parsedEndDate)}`});
      }
    }

    return activeFilters;
  };

  showPagination = () => {
    return false;
  }
}

