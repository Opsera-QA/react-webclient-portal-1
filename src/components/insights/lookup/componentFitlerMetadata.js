import { formatDate, hasDateValue } from "components/common/helpers/date/date.helpers";

export const insightsLookupMetadata = {
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
  getActiveFilters(filterDto) {
    const activeFilters = [];
    const DATE_STRING_FORMAT = "MM/dd/yyyy";

    const startDate = filterDto.getData("startDate");

    if (hasDateValue(startDate) === true) {
      const formattedStartDate = formatDate(startDate, DATE_STRING_FORMAT);
        activeFilters.push({
          filterId: "startDate",
          text: `Start Date: ${formattedStartDate}`
        });
    }

    const endDate = filterDto.getData("endDate");
    if (hasDateValue(endDate) === true) {
      const formattedEndDate = formatDate(endDate, DATE_STRING_FORMAT);
      activeFilters.push({
        filterId: "endDate",
        text: `End Date: ${formattedEndDate}`
      });
    }

    return activeFilters;
  },
  newObjectFields: {
    startDate: null,
    endDate: null,
    selectedComponentNames: [],
    activeFilters: []
  }
};