import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import { toolHelper } from "components/inventory/tools/tool.helper";

const createToolFilterMetadata = {
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

export class CreateToolFilterModel extends FilterModelBase {
  constructor() {
    super(createToolFilterMetadata);
  }

  canSearch = () => {
    return true;
  };
}


