import FilterModelBase from "core/data_model/filterModel.base";
import { formatDate, hasDateValue } from "components/common/helpers/date/date.helpers";

const insightsLookupMetadata = {
  idProperty: "_id",
  type: "Salesforce Component",
  fields: [
    {
      label: 'Start Date',
      id: 'startDate'
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
      label: "Component Names",
      id: "selectedComponentNames",
    },
  ],
  newObjectFields: {
    startDate: null,
    endDate: null,
    selectedComponentNames: [],
    activeFilters: [],
  },
};

export class LookupFilterModel extends FilterModelBase {
  constructor() {
    super(insightsLookupMetadata);
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

