import FilterModelBase from "core/data_model/filterModel.base";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import TagParsingHelper from "@opsera/persephone/helpers/data/tags/tagParsing.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const workflowWidgetFilterMetadata = {
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
      formText: "Please Note: This only contains Tags applied to the Workspace resources"
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
    pageSize: 12,
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

export default class WorkflowWidgetFilterModel extends FilterModelBase {
  constructor() {
    super(workflowWidgetFilterMetadata);
  }

  canSearch = () => {
    return true;
  };
}


