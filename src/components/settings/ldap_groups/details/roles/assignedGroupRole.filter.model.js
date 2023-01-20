import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import { toolHelper } from "components/inventory/tools/tool.helper";

const assignedGroupRoleFilterMetadata = {
  idProperty: "_id",
  fields: [
    {
      label: "Active Status",
      id: "status",
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
      label: "Type",
      id: "type",
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
    type: "tools",
    owner: "",
    ownerName: "",
    tag: "",
    activeFilters: [],
  },
};

export default class AssignedGroupRoleFilterModel extends FilterModelBase {
  constructor() {
    super(assignedGroupRoleFilterMetadata);
  }

  getDetailViewLink = (toolId) => {
    return toolHelper.getDetailViewLink(toolId);
  };
}


