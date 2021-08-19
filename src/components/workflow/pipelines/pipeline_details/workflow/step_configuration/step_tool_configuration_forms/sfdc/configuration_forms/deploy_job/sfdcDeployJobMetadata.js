const sfdcDeployJobMetadata = {
    fields: [
        {
            label: "SFDC Account",
            id: "sfdcToolName",
            isRequired: true
        },
        {
            label: "SFDC Unit Test Type",
            id: "sfdcUnitTestType",
            isRequired: true,
            formText: "TestLevel of NoTestRun cannot be used in production organizations"
        },
        {
            label: "Build/Xml Step Info",
            id: "stepIdXML",
            isRequired: true
        }
    ]
};

export default sfdcDeployJobMetadata;
