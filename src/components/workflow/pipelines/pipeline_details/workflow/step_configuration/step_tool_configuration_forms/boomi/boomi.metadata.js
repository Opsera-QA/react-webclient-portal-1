const boomiMetadata = {
    type: "Boomi Tool Configuration",
    fields: [
        {
            label: "Boomi Tool",
            id: "toolConfigId",
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
            label: "Job Type",
            id: "jobType",
        },
        {
            label: "File Path",
            id: "filePath",
        },
        {
            label: "File Name",
            id: "fileName",
        },
    ],
    newObjectFields: {
        toolConfigId: "",
        jobType: "CREATE_PACKAGE_COMPONENT",
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
        filePath: "",
        fileName: ""
    }
};

export default boomiMetadata;