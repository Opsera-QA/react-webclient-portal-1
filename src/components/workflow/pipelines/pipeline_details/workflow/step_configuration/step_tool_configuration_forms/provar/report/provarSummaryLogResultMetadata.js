const provarSummaryLogResultMetaData = {
    type: "Provar Summary Log Result Metadata",
    fields: [
        {
            label: "Class Name",
            id: "className",
        },
        {
            label: "Name",
            id: "name",
        },
        {
            label: "Time",
            id: "time"
        },
        {
            label: "Tests",
            id: "tests"
        },
        {
            label: "Failures",
            id: "failures"
        },
        {
            label: "Failure Cause",
            id: "failure"
        },
        {
            label: "Tests Skipped",
            id: "skipped"
        }
    ],
    newObjectFields: {
        className: "",
        name: "",
        time: "",
        tests: "",
        failures: "",
        skipped: "",
        failure: ""
    }
};

export default provarSummaryLogResultMetaData;