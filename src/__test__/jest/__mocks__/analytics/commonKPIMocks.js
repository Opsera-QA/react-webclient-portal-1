export default {
    default:{
        kpiConfiguration : {
            "kpi_category": [
                "source-code"
            ],
            "filters": [
                {
                    "type": "tags",
                    "value": []
                },
                {
                    "type": "date",
                    "value": null
                }
            ],
            "dataPoints": [],
            "tags": [],
            "_id": "sample_dashboard_1",
            "kpi_identifier": "kpi-identifier",
            "kpi_name": "KPI Name",
            "kpi_settings": {
                "rows": 4
            },
            "active": true,
            "updatedAt": "2022-08-13T00:00:00.000Z"
        },
        dashboardConfiguration: {
            "metaData": {
                "idProperty": "_id",
                "type": "Dashboard",
                "activeField": "active",
                "fields": [
                    {
                        "label": "Account",
                        "id": "account"
                    },
                    {
                        "label": "ID",
                        "id": "_id"
                    },
                    {
                        "label": "Created",
                        "id": "createdAt"
                    },
                    {
                        "label": "Last Update",
                        "id": "updatedAt"
                    },
                    {
                        "label": "Type",
                        "id": "type"
                    },
                    {
                        "label": "Tags",
                        "id": "tags"
                    },
                    {
                        "label": "Organizations",
                        "id": "organizations"
                    },
                    {
                        "label": "Filters",
                        "id": "hierarchyFilters"
                    },
                    {
                        "label": "Attributes",
                        "id": "attributes"
                    },
                    {
                        "label": "Visibility",
                        "id": "visibility"
                    },
                    {
                        "label": "Name",
                        "id": "name",
                        "isRequired": true,
                        "maxLength": 50,
                        "regexDefinitionName": "generalTextWithSpacesSlash",
                        "formText": "Names can be up to 50 characters and can consist of letters, apostrophes, numbers, spaces, slashes, dashes, colons, underscores, and periods"
                    },
                    {
                        "label": "Description",
                        "id": "description",
                        "maxLength": 255
                    },
                    {
                        "label": "Active",
                        "id": "active"
                    },
                    {
                        "label": "Favorite",
                        "id": "isFavorite"
                    },
                    {
                        "label": "Configuration",
                        "id": "configuration"
                    },
                    {
                        "label": "Filters",
                        "id": "filters"
                    },
                    {
                        "label": "Roles",
                        "id": "roles"
                    },
                    {
                        "label": "Owner",
                        "id": "owner"
                    },
                    {
                        "label": "Owner",
                        "id": "owner_name"
                    }
                ],
                "newObjectFields": {
                    "name": "",
                    "description": "",
                    "visibility": "private",
                    "type": "",
                    "active": true,
                    "isFavorite": false,
                    "tags": [],
                    "configuration": [],
                    "attributes": {},
                    "filters": [],
                    "roles": [],
                    "owner": "",
                    "owner_name": ""
                }
            },
            "data": {
                "name": "Custom Name",
                "description": "",
                "visibility": "private",
                "type": "",
                "active": true,
                "isFavorite": false,
                "tags": [],
                "configuration": [
                    {
                        "kpi_category": [
                            "source-code"
                        ],
                        "filters": [
                            {
                                "type": "tags",
                                "value": []
                            },
                            {
                                "type": "date",
                                "value": null
                            }
                        ],
                        "dataPoints": [],
                        "tags": [],
                        "_id": "sample_dashboard_1",
                        "kpi_identifier": "kpi-identifier",
                        "kpi_name": "KPI Name",
                        "kpi_settings": {
                            "rows": 4
                        },
                        "active": true,
                        "updatedAt": "2022-08-13T00:00:00.000Z"
                    }
                ],
                "attributes": {
                    "persona": ""
                },
                "filters": [],
                "roles": [],
                "owner": "owner_id",
                "owner_name": "Deactivated User",
                "_id": "62f76b5a4b7de448f2656192",
                "account": "devqaaccc",
                "createdAt": "2022-08-13T09:14:02.850Z",
                "updatedAt": "2022-08-13T11:05:56.509Z",
                "__v": 0
            },
            "newModel": false,
            "id": "62f76b5a4b7de448f2656192",
            "dataState": 0,
            "changeMap": {},
            "isLoading": false,
            "updateAllowed": true,
            "deleteAllowed": true,
            "editAccessRolesAllowed": true,
            "roleDefinitions": {
                "get_dashboards": {
                    "id": "get_dashboards",
                    "description": "Allowed to pull Dashboards",
                    "allowedRoles": [
                        "no_access_rules"
                    ]
                },
                "get_dashboard_by_id": {
                    "id": "get_dashboard_by_id",
                    "description": "Allowed to get a specific Dashboard by ID",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "administrator",
                        "manager",
                        "owner",
                        "user",
                        "guest"
                    ]
                },
                "create_dashboard": {
                    "id": "create_dashboard",
                    "description": "Allowed to create a Dashboard",
                    "allowedRoles": [
                        "no_access_rules"
                    ]
                },
                "update_dashboard": {
                    "id": "update_dashboard",
                    "description": "Able to update a Dashboard",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "administrator",
                        "manager",
                        "owner"
                    ]
                },
                "update_dashboard_filters": {
                    "id": "update_dashboard_filters",
                    "description": "Able to update a Dashboard's Filters",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "administrator",
                        "manager",
                        "owner",
                        "user"
                    ]
                },
                "edit_access_roles": {
                    "id": "edit_access_roles",
                    "description": "Able to update a Dashboard's Access Roles",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "administrator",
                        "manager",
                        "owner"
                    ]
                },
                "delete_dashboard": {
                    "id": "delete_dashboard",
                    "description": "Able to delete a Dashboard",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "administrator",
                        "owner"
                    ]
                },
                "transfer_dashboard_ownership_to_new_user": {
                    "id": "transfer_dashboard_ownership_to_new_user",
                    "description": "Able to transfer a Dashboard's Ownership to another user",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "administrator",
                        "owner"
                    ]
                },
                "publish_dashboard_to_private_catalog": {
                    "id": "publish_dashboard_to_private_catalog",
                    "description": "Able to publish a Dashboard to your private catalog",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "administrator",
                        "owner",
                        "manager"
                    ]
                },
                "add_dashboard_metric": {
                    "id": "add_dashboard_metric",
                    "description": "Allowed to add a metric to a Dashboard",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "manager",
                        "administrator",
                        "owner"
                    ]
                },
                "update_dashboard_metric": {
                    "id": "update_dashboard_metric",
                    "description": "Allowed to update a Dashboard Metric, including its filters",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "manager",
                        "administrator",
                        "owner",
                        "user"
                    ]
                },
                "delete_dashboard_metric": {
                    "id": "delete_dashboard_metric",
                    "description": "Able to delete a Dashboard",
                    "allowedRoles": [
                        "opsera_administrator",
                        "site_administrator",
                        "saas_user",
                        "administrator",
                        "manager",
                        "owner"
                    ]
                }
            },
            "cancelTokenSource": {
                "token": {
                    "promise": {},
                    "_listeners": []
                }
            },
            "customerAccessRules": {
                "OrganizationOwner": false,
                "OrganizationAccountOwner": false,
                "Administrator": false,
                "PowerUser": false,
                "SassPowerUser": true,
                "FreeTrialUser": false,
                "User": false,
                "UserId": "60785c10ae42330133c55f7e",
                "Email": "devqaaccc@yopmail.com",
                "Role": "power_user",
                "Type": "sass-user",
                "Groups": [
                    "NonLDAPEndUser"
                ]
            }
        }
    }
};