const sfdcProfileMigrationJobMetadata = {
    fields: [
        // {
        //     label: "Select Account",
        //     id: "gitCredential",
        //     isRequired: true
        // },
        {
            label: "SFDC Account",
            id: "sfdcToolName",
            isRequired: true
        },
        {
            label: "Destination SFDC Account",
            id: "sfdcDestToolName",
            isRequired: true
        }
    ]
};

export default sfdcProfileMigrationJobMetadata;
