import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const pipelineTemplateCatalogFilterMetadata = {
  idProperty: "_id",
  type: "Pipeline Catalog",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tag",
      id: "tag",
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
      label: "Pipeline Owner",
      id: "owner"
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
      label: "Pipeline Type",
      id: "type",
    },
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];

    if (filterDto.getData("tag") != null) {
      const tag = filterDto.getData("tag");
      activeFilters.push({filterId: "tag", text: `Tag: ${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`});
    }

    if (filterDto.getData("type") !== "") {
      const type = filterDto.getData("type");
      activeFilters.push({filterId: "type", text: `Type: ${type?.text}`});
    }

    if (filterDto.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keyword: ${filterDto.getData("search")}`});
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 25,
    currentPage: 1,
    sortOption: { value: "name", text: "Template Name (A-Za-z)" },
    search: "",
    type: "",
    activeFilters: []
  },
  sortOptions: [
    { option: "newest", text: "Newest Templates"},
    { option: "oldest", text: "Oldest Templates"},
    { option: "name", text: "Template Name (A-Za-z)" },
    { option: "lastupdated", text: "Last Updated"},
    { option: "description", text: "Description"},
  ]
};

export default pipelineTemplateCatalogFilterMetadata;