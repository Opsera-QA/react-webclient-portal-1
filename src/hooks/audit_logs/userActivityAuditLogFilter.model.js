import FilterModelBase from "core/data_model/filterModel.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import auditLogActionConstants from "@opsera/definitions/constants/audit-logs/actions/auditLogAction.constants";

const userActivityAuditLogFilterMetadata = {
  type: "User Audit Log",
  fields: [
    {
      label: "Action",
      id: "action",
    },
    {
      label: "Action",
      id: "actions",
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
    actions: [],
    search: "",
    user: "",
    activeFilters: [],
  },
};

export class UserActivityAuditLogFilterModel extends FilterModelBase {
  constructor(type) {
    super(userActivityAuditLogFilterMetadata);

    if (auditLogTypeConstants.isUserActivityLogTypeValid(type) === true) {
      this.type = type;
    }
  }

  getActiveFilters = () => {
    const activeFilters = [];
    const action = DataParsingHelper.parseString(this.getData("action"));

    if (action) {
      activeFilters.push({filterId: "action", text: `Action: ${action}`});
    }

    // const actions = DataParsingHelper.parseArray(this.getData("actions"));
    //
    // if (actions) {
    //   activeFilters.push({filterId: "actions", text: `Actions: ${actions}`});
    // }

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

  // TODO: Put the switch statement logic inside the action constants and pass the type through this function
  getActionSelectOptionsForType = () => {
    switch (this.type) {
      case auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE:
        return auditLogActionConstants.IN_USE_PIPELINE_USER_ACTIVITY_LOG_ACTION_SELECT_OPTIONS;
      default:
        return auditLogActionConstants.USER_ACTIVITY_LOG_TYPE_SELECT_OPTIONS;
    }
  };
}

