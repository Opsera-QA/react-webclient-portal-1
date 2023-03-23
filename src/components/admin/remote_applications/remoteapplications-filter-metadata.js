const remoteApplicationFilterMetadata = {
    idProperty: "_id",
    type: "Remote Application",
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
    ],
    newObjectFields: {
        pageSize: 50,
        currentPage: 1,
        sortOption: {text: "Sort: Newest", value: "newest"},
        search: "",
    },
    sortOptions: [
        {text: "Oldest", option: "oldest"},
        {text: "Newest", option: "newest"},
        {text: "Last Updated", option: "lastupdated"}
    ]
};

export default remoteApplicationFilterMetadata;