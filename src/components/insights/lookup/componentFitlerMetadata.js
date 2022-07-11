const componentFilterMetadata = {
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
  ],
  getActiveFilters(filterDto) {
    const activeFilters = [];

    if (filterDto.getData("startDate") != null) {
        activeFilters.push({
          filterId: "startDate",
          text: filterDto.getData("startDate")
        });
    }

    if (filterDto.getData("endDate") != null) {
      activeFilters.push({
        filterId: "endDate",
        text: filterDto.getData("endDate")
      });
    }

    return activeFilters;
  },
  newObjectFields: {
    startDate: null,
    endDate: null,
    activeFilters: []
  }
};

export default componentFilterMetadata;