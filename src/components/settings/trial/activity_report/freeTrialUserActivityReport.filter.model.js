import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

const freeTrialUserActivityReportMetadata = {
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
      label: "Free Trial User",
      id: "userId",
    },
    {
      label: "Free Trial User",
      id: "userEmail",
    },
    {
      label: "Keyword Search Text",
      id: "search",
    },
  ],
  newObjectFields: {
    pageSize: 100,
    currentPage: 1,
    totalCount: 0,
    activeFilters: [],
    userId: "",
    userEmail: "",
    search: "",
  },
};

export default class FreeTrialUserActivityReportFilterModel extends FilterModelBase {
  constructor() {
    super(freeTrialUserActivityReportMetadata);
    this.enableUrlUpdatesWithQueryParameters();
    this.unpackUrlParameters();
  }

  canToggleView = () => {
    return true;
  };

  canSearch = () => {
    return true;
  };

  unpackUrlParameters = () => {
    this.unpackCommonUrlParameters();

    const userId = sessionHelper.getStoredUrlParameter("userId");

    if (hasStringValue(userId) === true) {
      this.setData("userId", userId);
    }
  };

  getActiveFilters = () => {
    const activeFilters = [];

    const userId = this.getData("userId");
    const userEmail = this.getData("userEmail") || userId;

    if (isMongoDbId(userId)) {
      activeFilters.push({filterId: "userId", text: `Owner: ${userEmail}`});
    }

    const searchKeyword = this.getData("search");

    if (hasStringValue(searchKeyword) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchKeyword}`});
    }

    return activeFilters;
  };
}


