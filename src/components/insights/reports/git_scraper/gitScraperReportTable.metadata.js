const gitScraperScanReportMetadata = {
    idProperty: "_id",
    type: "Sonar Scan",
    fields: [
        {
            label: "Path",
            id: "path",
        },
        {
            label: "Author",
            id: "author",
        },
        {
            label: "Commit",
            id: "commit",
        },
        {
            label: "Commit Date",
            id: "commitDate",
        },
        {
            label: "Line Number",
            id: "lineNumber",
        },
        {
            label: "Reason",
            id: "reason",
        },
    ],
    newObjectFields: {
        project: "",
        severity:"",
        line: "",
        message:"",
    }
};

export default gitScraperScanReportMetadata;