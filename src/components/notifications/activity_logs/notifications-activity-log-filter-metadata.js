import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import {
  getNotificationTypeLabel
} from "components/common/list_of_values_input/notifications/type/notificationTypes.constants";

const notificationActivityLogFilterMetadata = {
  idProperty: "_id",
  type: "Notification Activity Log",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Type",
      id: "type",
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
      label: "Sort Option",
      id: "sortOption",
    },
    {
      label: "Tag",
      id: "tag",
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
  getActiveFilters(filterModel) {
    const activeFilters = [];

    if (filterModel == null) {
      return filterModel;
    }

    const status = filterModel.getData("status");

    if (hasStringValue(status) === true) {
      activeFilters.push({filterId: "status", text: `Status: ${capitalizeFirstLetter(status)}`});
    }

    const type = filterModel.getData("type");

    if (hasStringValue(type) === true) {
      activeFilters.push({filterId: "type", text: `Type: ${getNotificationTypeLabel(type)}`});
    }

    const tag = filterModel.getData("tag");

    if (hasStringValue(tag) === true) {
      const tagArray = tag.split(":");

      if (Array.isArray(tagArray) && tagArray.length === 2) {
        activeFilters.push({ filterId: "tag", text: `Tag: ${capitalizeFirstLetter(tagArray[0])}: ${tagArray[1]}` });
      }
    }

    const searchKeyword = filterModel.getData("search");

    if (hasStringValue(searchKeyword) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchKeyword}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: {text: "Sort: Name", value: "name"},
    search: "",
    activeFilters: []
  },
  // TODO: If these are the same options everywhere, move to PageSort
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Name", option: "name"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default notificationActivityLogFilterMetadata;