import {capitalizeFirstLetter} from "../../../../common/helpers/string-helpers";
import { addDays } from "date-fns";

export const apigeeReportsMetadata = {
  idProperty: "_id",
  type: "APIGEE Reports",
  fields: [
      {
        label: "Tags",
        id: "tags",
      },
      {
        label: "Date Range",
        id: "date",
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
         label: "Organization",
         id: "organization",
       },
      {
        label: "Environment",
        id: "environment",
      },
      {
        label: "Total Assets Deployed",
        id: "totalAssetsDeployed",
      },
      {
        label: "New Assets",
        id: "newAssets",
      },
      {
        label: "Updated Assets",
        id: "updatedAssets",
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
        label: "Name",
        id: "name"
      },
      {
        label: "Revision",
        id: "revision"
      },
      {
        label: "Type",
        id: "type"
      },
      {
        label: "State",
        id: "state"
      },
      {
        label: "Is New",
        id: "isNew"
      }
    ],
    getActiveFilters(filterDto) {
       let activeFilters = [];

       if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
         activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
       }

       return activeFilters;
    },
    newObjectFields: {
       pageSize: 10,
       currentPage: 1,
       search: "",
       activeFilters: [],
       tags: [],
       date: undefined,
    }
  };
