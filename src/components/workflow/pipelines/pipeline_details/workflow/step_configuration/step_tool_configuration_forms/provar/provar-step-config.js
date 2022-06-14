const provarStepFormMetadata = {
    type: "Provar Tool Configuration",
    fields: [
        {
            label: "Provar Tool",
            id: "provarToolId",
            isRequired: true
        },
        {
            label: "Salesforce Tool",
            id: "sfdcToolId",
            isRequired: true
        },
        {
            label: "SCM Tool",
            id: "gitToolId",
        },
        {
            label: "Repository ID",
            id: "repoId",
        },
        {
            label: "Project ID",
            id: "projectId",
        },
        {
            label: "SCM Service Type",
            id: "service",
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
        },
        {
            label: "Workspace",
            id: "workspace"
        },
        {
            label: "Workspace/Project",
            id: "workspaceName"
        },
        {
            label: "Branch",
            id: "gitBranch",
        },
        {
            label: "Ant Build XML Path",
            id: "buildXmlPath",
        },
        {
            label: "Ant Target",
            id: "antTarget",
        }
    ],
    newObjectFields: {
        provarToolId: "",
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
    }
};

export default provarStepFormMetadata;