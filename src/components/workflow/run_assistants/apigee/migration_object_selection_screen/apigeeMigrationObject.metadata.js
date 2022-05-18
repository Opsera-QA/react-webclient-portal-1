export const apigeeMigrationObjectMetadata = {
    type: "Apigee Migration Object",
    fields: [
        {
            id: "id"            
        },
        {
            label: "Name",
            id: "name"
        },
        {
            label: "Type",
            id: "type"
        },
        {
            label: "Version",
            id: "version"            
        },
        {
            label: "Dependencies",
            id: "dependencies"
        }
    ],
    newObjectFields: {
        id: "",
        name: "",
        type: "",
        version: "",
        dependencies: [],
    }
};