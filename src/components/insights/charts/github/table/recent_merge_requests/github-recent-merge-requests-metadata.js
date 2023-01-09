const githubRecentMergeRequestsMetadata = {
    idProperty: "_id",
    type: "Github Pending Merge Requests",
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
        label: "Sort Option",
        id: "sortOption",
      },
      {
        label: "Search",
        id: "search",
      },
      {
        label: "Author",
        id: "AuthorName",
      },
      {
        label: "ID",
        id: "_id",
      },
      {
        label: "URL",
        id: "mergeRequestUrl",
      },
      {
        label: "Reviewer",
        id: "AssigneeName",
      },
      {
        label: "Pull Request Title",
        id: "MergeRequestTitle",
      },
      {
        label: "Branch",
        id: "BranchName",
      },
      {
        label: "Project",
        id: "ProjectName",
      },
      {
        label: "Completed At",
        id: "mrCompletionTimeTimeStamp"
      },
      {
        label: "Duration",
        id: "MergeRequestTimeTaken"
      },
    ],
    newObjectFields: {
      pageSize: 5,
      currentPage: 1,
      sortOption: {text: "Newest", value: ""},
      search: "",
      type:"recent",
    },
    sortOptions: [
      {text: "Newest", option: ""},
      {text: "Oldest", option: "oldest"}
    ]
  };

export default githubRecentMergeRequestsMetadata;