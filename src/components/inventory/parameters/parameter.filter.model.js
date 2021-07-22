import FilterModelBase from "core/data_model/filterModel.base";

const parameterFilterMetadata = {
  type: "Parameter",
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
  ],
  newObjectFields: {
    pageSize: 100,
    currentPage: 1,
    search: "",
    activeFilters: []
  },
};

export class ParameterFilterModel extends FilterModelBase {
  constructor(getAccessToken, cancelTokenSource, loadData) {
    super(parameterFilterMetadata);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
  }

  canSearch = () => {
    return true;
  }

  showPagination = () => {
    return false;
  }
}

export default ParameterFilterModel;


