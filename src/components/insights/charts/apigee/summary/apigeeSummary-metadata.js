import {capitalizeFirstLetter} from "../../../../common/helpers/string-helpers";
import { addDays } from "date-fns";

export const apigeeSummaryMetadata = {
  idProperty: "_id",
  type: "APIGEE Summary",
  fields: [
      {
        label: "Tags",
        id: "tags",
      },
      {
        label: "Date Range",
        id: "date",
      }
    ],
    newObjectFields: {
       activeFilters: [],
       tags: [],
       date: undefined,
    }
  };
