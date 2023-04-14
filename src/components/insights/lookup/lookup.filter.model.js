import FilterModelBase from "core/data_model/filterModel.base";
import { formatDate, hasDateValue } from "components/common/helpers/date/date.helpers";
import {subDays} from "date-fns";
import AppliedTagBadge from "../../common/badges/tag/AppliedTagBadge";
import React from "react";

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
      label: "Label",
      id: "label",
    },
    {
      label: "Date Range",
      id: "dateRange",
    },
    {
      label: "Component Names (select date range and component type to load this filter)",
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
    label: "",
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

    const type = this.getData("selectedComponentFilterData");
    if(type.length > 0) {
      if (hasDateValue(type) === true) {
        activeFilters.push({
          filterId: "Type",
          text: `Type : ${type}`
            }
        );
      }
    }

    const name = this.getData("selectedComponentNames");
    if(name.length > 0) {
      if (hasDateValue(name) === true) {
        activeFilters.push({
          filterId: "Name",
          text: `Name : ${name}`
        });
      }
    }

    const pipeline = this.getData("pipelineComponentFilterData");
    if(pipeline.length > 0) {
      for (let temp in pipeline) {
        if (hasDateValue(pipeline) === true) {
          activeFilters.push({
            filterId: "Pipeline",
            text: `Pipeline : ${pipeline[temp].name}`
          });
        }
      }
    }

    const org = this.getData("orgsComponentFilterData");
    if(org.length > 0) {
      for (let temp in org) {
        if (hasDateValue(org) === true) {
          activeFilters.push({
            filterId: "Org",
            text: `Org : ${org[temp].name}`
          });
        }
      }
    }

    return activeFilters;
  };

  areFilterBadgesReadOnly = () => {
    return true;
  };
}

export default LookupFilterModel;


