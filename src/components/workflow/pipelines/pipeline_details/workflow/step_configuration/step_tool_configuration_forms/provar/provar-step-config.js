import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const provarStepFormMetadata = {
    type: "Provar Tool Configuration",
    fields: [
        {
            label: "Provar Tool",
            id: "provarToolId",
            isRequired: true
        },
        {
            label: "Use Salesforce Org",
            id: "useSfdcOrg",
        },
        {
            label: "Salesforce Configurator Tool",
            id: "sfdcToolId",
            isRequiredFunction: (model) => {
                return model?.getData("useSfdcOrg") === true;
            },
        },
        {
            label: "Source Code Management Tool",
            id: "gitToolId",
            isRequired: true
        },
        {
            label: "Repository",
            id: "repoId",
            dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
        },
        {
            label: "Project ID",
            id: "projectId",
            dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
        },
        {
            label: "Source Code Management Type",
            id: "service",
            isRequired: true
        },
        {
            label: "GIT URL",
            id: "gitUrl"
        },
        {
            label: "SSH URL",
            id: "sshUrl",
        },
        {
            label: "Repository",
            id: "repository",
            dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
            isRequired: true
        },
        {
            label: "Workspace",
            id: "workspace"
        },
        {
            label: "Workspace/Project",
            id: "workspaceName",            
            isRequiredFunction: (model) => {
                return model?.getData("service") === "bitbucket";
            },
        },
        {
            label: "Branch",
            id: "gitBranch",
            dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
            isRequired: true
        },
        {
            label: "Ant Build XML Path",
            id: "buildXmlPath",
        },
        {
            label: "Ant Target",
            id: "antTarget",
        },
        {
            label: "Environment Variables",
            id: "isEnvironmentVariables"
        },
        {
            label: "Environment Variables",
            id: "environmentVariables"
        }
    ],
    newObjectFields: {
        provarToolId: "",
        useSfdcOrg: false,
        sfdcToolId: "",
        gitToolId: "",
        repoId: "",
        projectId: "",
        gitUrl: "",
        sshUrl: "",
        service: "",
        workspace: "",
        workspaceName: "",
        repository: "",
        gitBranch: "",
        buildXmlPath : "",
        antTarget: "",
        jobType: "SFDC_PROVAR_TEST",
        isEnvironmentVariables: false,
        environmentVariables: []
    }
};

export default provarStepFormMetadata;