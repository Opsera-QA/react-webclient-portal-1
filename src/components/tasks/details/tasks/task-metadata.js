const tasksMetadata = {
    idProperty: "_id",
    type: "Task",
    activeField: "active",
    fields: [
        {
            label: "ID",
            id: "_id",
        },
        {
            label: "Name",
            id: "name",
            isRequired: true,
            maxLength: 25,
            regexDefinitionName: "limitedTextWithSpaces",
        },
        {
            label: "Run Count",
            id: "run_count",
        },
        {
            label: "Description",
            id: "description",
            maxLength: 255,
            regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
        },
        {
            label: "Owner",
            id: "owner_name",
        },
        {
            label: "Role Access Level",
            id: "role_access_level",
        },
        {
            label: "Type",
            id: "type",
            isRequired: true,
            maxLength: 50,
            regexDefinitionName: "generalText",
        },
        {
            label: "Tool",
            id: "tool_identifier",
            maxLength: 10,
            regexDefinitionName: "generalText",
        },
        {
            label: "Active",
            id: "active",
        },
        {
            label: "Configuration",
            id: "configuration",
        },
        {
            label: "Notifications",
            id: "notifications",
        },
        {
            label: "Status",
            id: "status",
        },
        {
            label: "Tags",
            id: "tags",
        },
        {
            label: "LDAP Account",
            id: "account",
            maxLength: 50,
            regexDefinitionName: "generalText",
        },
        {
            label: "Created",
            id: "createdAt",
        },
        {
            label: "Updated",
            id: "updatedAt",
        },
        {
            label: "Access Rules",
            id: "roles",
        },
        {
            label: "Schedule",
            id: "schedule"
        }
    ],
    newObjectFields: {
        name: "",
        description: "",
        run_count: 0,
        type: "",
        tool_identifier: "",
        active: true,
        configuration: {},
        status: "created",
        tags: [],
        roles: [],
        notifications: [],
        account: "",
    },
};

export default tasksMetadata;
