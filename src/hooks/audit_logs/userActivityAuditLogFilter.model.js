import FilterModelBase from "core/data_model/filterModel.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const userActivityAuditLogFilterMetadata = {
  type: "User Audit Log",
  fields: [
    {
      label: "Action",
      id: "action",
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
      label: "Search",
      id: "search",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
    {
      label: "User",
      id: "user",
    },
  ],
  newObjectFields: {
    pageSize: 25,
    currentPage: 1,
    action: "",
    search: "",
    user: "",
    activeFilters: [],
  },
};

export class UserActivityAuditLogFilterModel extends FilterModelBase {
  constructor() {
    super(userActivityAuditLogFilterMetadata);
  }

  getActiveFilters = () => {
    const activeFilters = [];
    const action = DataParsingHelper.parseString(this.getData("action"));

    if (action) {
      activeFilters.push({filterId: "action", text: `Action: ${action}`});
    }

    const searchText = DataParsingHelper.parseString(this.getData("search"));

    if (searchText) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchText}`});
    }

    const user = DataParsingHelper.parseMongoDbId(this.getData("user"));
    const userName = DataParsingHelper.parseString(this.getData("ownerName"));

    if (user) {
      activeFilters.push({filterId: "user", text: `User: ${userName}`});
    }

    return activeFilters;
  };
}

