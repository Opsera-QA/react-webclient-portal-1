const sfdcPushArtifactsJobMetadata = {
    fields: [
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
            label: "Create a new backup branch?",
            id: "isNewBranch",
            // isRequired: true,
            formText: "Creates a new branch and push the artifacts."
        },
        {
            label: "Branch",
            id: "gitBranch",
            isRequired: true
        },
        {
            label: "Upstream Branch",
            id: "upstreamBranch"
        },
        {
            label: "Build/Xml Step Info",
            id: "stepIdXML",
            isRequired: true
        },
        {
            label: "Script File Path",
            id: "scriptFilePath",            
          },
          {
            label: "Script File Name",
            id: "scriptFileName",
            formText: "File name with extension is expected."            
          },
          {
            label: "Output Path",
            id: "outputPath",
          },
          {
            label: "Output File Name",
            id: "outputFileName",
            formText: "File name with extension is expected."            
          },
    ]
};

export default sfdcPushArtifactsJobMetadata;
