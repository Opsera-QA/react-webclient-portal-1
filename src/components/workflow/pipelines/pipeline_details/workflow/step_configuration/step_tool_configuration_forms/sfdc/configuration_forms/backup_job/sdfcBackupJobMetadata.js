const sdfcBackupJobMetadata = {
    fields: [
        {
            label: "SFDC Account",
            id: "sfdcToolName",
            isRequired: true
        },
        {
            label: "Take Full Backup?",
            id: "isFullBackup",
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
            label: "Repository",
            id: "repositoryName",
            isRequired: true
        },
        {
            label: "Rollback Branch Name",
            id: "rollbackBranchName",
            // isRequired: true,
            formText: "An Orphan branch will be created with only the back up specific files."
        },
        {
            label: "Build/Xml Step Info",
            id: "stepIdXML",
            isRequired: true
        }
    ]
};

export default sdfcBackupJobMetadata;
