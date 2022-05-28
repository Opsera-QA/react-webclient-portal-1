const GitCustodianMetaData = {
  idProperty: "_id",
  type: "Git Custodian",
  activeField: "active",
  fields: [
    {
      label: "Date Created",
      id: "dateCreated",
    },
    {
      label: "Author",
      id: "author",
    },
    {
      label: "Path",
      id: "path",
    },
    {
      label: "Origin",
      id: "origin",
    },
    {
    label: "Exposed For",
    id: "exposedFor"
    },
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Repository",
      id: "repositoryName"
    },
    {
      label: "Main Branch",
      id: "mainBranch"
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
     name: "",
     description: "",
     visibility: "private",
     type: "",
     active: true,
     isFavorite: false,
     tags: [],
     configuration: [],
     attributes: {},
     filters: [],
     roles: [],
     owner: "",
     owner_name: "",
   }
};

export const gitCustodianFiltersMetadata = {
  type: "Git Custodian Tags Filter",
  fields: [
    {
      label: "Tags",
      id: "tags"
    },
    {
      label: "Filters",
      id: "gitCustodianFilters",
    },
    {
      label: "Date",
      id: "date"
    }
  ],
  newObjectFields: {
    tags: [],
    organizations: [],
    gitCustodianFilters: {},
    date: {
      startDate: null,
      endDate: null,
      key: "selection",
    }
  },
};
export default GitCustodianMetaData;
