const sfdcCreatePackageXmlJobMetadata = {
    fields: [
        {
            label: "SFDC Account",
            id: "sfdcToolName",
            isRequired: true
        },
        {
            label: "Compare with destination SFDC Org?",
            id: "isOrgToOrg",
            // isRequired: true
        },
        {
            label: "Select Account",
            id: "gitCredential",
            isRequired: true
        },
        {
            label: "Repository",
            id: "repository",
            isRequired: true
        },
        {
            label: "Branch",
            id: "gitBranch",
            isRequired: true
        },
    ]
};

export default sfdcCreatePackageXmlJobMetadata;
