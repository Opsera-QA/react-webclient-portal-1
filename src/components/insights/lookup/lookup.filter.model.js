import FilterModelBase from "core/data_model/filterModel.base";
import { formatDate, hasDateValue } from "components/common/helpers/date/date.helpers";
import {subDays} from "date-fns";

const insightsLookupMetadata = {
  idProperty: "_id",
  type: "Salesforce Component",
  fields: [
    {
      label: 'Start Date',
      id: 'startDate'
    },
    {
      label: "Search",
      id: "search",
    },
    {
      label: 'End Date',
      id: 'endDate'
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
    {
      label: "Date Range",
      id: "dateRange",
    },
    {
      label: "Component Names",
      id: "selectedComponentNames",
    },
    {
      label: "Component Type Filter",
      id: "selectedComponentFilterData",
    },
    {
      label: "Component Pipeline Filter",
      id: "pipelineComponentFilterData",
    },
    {
      label: "Component Tasks Filter",
      id: "tasksComponentFilterData",
    },
    {
      label: "Component Orgs Filter",
      id: "orgsComponentFilterData",
    },
    {
      label: "Component Name Filter",
      id: "namesFilterData",
    },
  ],
  newObjectFields: {
    startDate: null,
    endDate: null,
    search: "",
    selectedComponentNames: [],
    pipelineComponentFilterData: [],
    orgsComponentFilterData:[],
    activeFilters: [],
    selectedComponentFilterData: [],
    namesFilterData: [],
  },
};

export class LookupFilterModel extends FilterModelBase {
  constructor() {
    super(insightsLookupMetadata);
    this.setData("startDate", subDays(new Date(), 7));
    this.setData("endDate", new Date());
  }

  getActiveFilters = () => {
    const activeFilters = [];
    const DATE_STRING_FORMAT = "MM/dd/yyyy";

    const startDate = this.getData("startDate");

    if (hasDateValue(startDate) === true) {
      const formattedStartDate = formatDate(startDate, DATE_STRING_FORMAT);
      activeFilters.push({
        filterId: "startDate",
        text: `Start Date: ${formattedStartDate}`
      });
    }

    const endDate = this.getData("endDate");
    if (hasDateValue(endDate) === true) {
      const formattedEndDate = formatDate(endDate, DATE_STRING_FORMAT);
      activeFilters.push({
        filterId: "endDate",
        text: `End Date: ${formattedEndDate}`
      });
    }

    return activeFilters;
  };

  areFilterBadgesReadOnly = () => {
    return true;
  };
}

export default LookupFilterModel;


