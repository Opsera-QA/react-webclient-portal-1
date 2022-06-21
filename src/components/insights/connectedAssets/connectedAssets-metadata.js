import {capitalizeFirstLetter} from "../../common/helpers/string-helpers";
import { addDays } from "date-fns";

const connectedAssetsMetadata = {
  idProperty: "_id",
  type: "Connected Assets",
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
         label: "Pipeline Name",
         id: "pipeline_name",
       },
      {
        label: "Pipeline URL",
        id: "pipeline_url",
      },
       {
         label: "Created At",
         id: "pipeline_created_at",
       },
       {
         label: "Last Run (in days)",
         id: "pipeline_last_run",
       },
       {
         label: "User Created",
         id: "pipeline_owner_name",
       },
       {
         label: "Task Name",
         id: "task_name",
       },
       {
         label: "Created At",
         id: "task_created_at",
       },
       {
         label: "Last Run (in days)",
         id: "task_last_run",
       },
       {
         label: "User Created",
         id: "task_owner_name",
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
       sortOption: {text: "Newest", value: ""},
       search: "",
       activeFilters: [],
       date: {
         startDate: new Date(addDays(new Date(), -90)),
         endDate: addDays(new Date, 1),
         key: "selection",
       }
    },
      sortOptions: [
       {text: "Newest", option: ""},
       {text: "Oldest", option: "oldest"}

    ]
  };

export default connectedAssetsMetadata;
