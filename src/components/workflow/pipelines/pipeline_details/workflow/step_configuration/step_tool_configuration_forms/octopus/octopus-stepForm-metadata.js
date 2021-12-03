const octopusStepFormMetadata = {
    type: "Octopus API Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Is Full Backup",
        id: "isFullBackup"
      },
      {
        label: "Octopus URL",
        id: "toolURL",
        isRequired: true
      },
      {
        label: "Octopus API Key",
        id: "octopusApiKey",
        isRequired: true
      },
      {
        label: "Space Name",
        id: "spaceName",
        isRequired: true
      },
      {
        label: "Project Name",
        id: "projectName",        
        regexDefinitionName: "generalText",
        maxLength: 100
      },
      {
        label: "Environment Name",
        id: "environmentName",
        isRequired: true
      },
      {
        label: "Octopus Tool ID",
        id: "octopusToolId",
        isRequired: true
      },
      {
        label: "Space Name ID",
        id: "spaceId",
        isRequired: true
      },
      {
        label: "Project Name",
        id: "projectId",
      },
      {
        label: "Project Description",
        id: "projectDescription",        
        regexDefinitionName: "generalText",
        maxLength: 100
      },
      {
        label: "Environment Name ID",
        id: "environmentId",
        isRequired: true
      },
      {
        label: "Namespace",
        id: "namespace",
        regexDefinitionName: "generalText",
        maxLength: 100
      },
      {
        label: "Artifact Step",
        id: "ecrPushStepId",
        // isRequired: true
      },
      {
        label: "Deployment ID",
        id: "deploymentId"
      },
      {
        label: "Deployment Target Role",
        id: "octopusTargetRoles"
      },
      {
        label: "Octopus Platform Type",
        id: "octopusPlatformType"
      },
      {
        label: "Octopus Deployment Type",
        id: "octopusDeploymentType"
      },
      {
        label: "Octopus Feed",
        id: "octopusFeedId"
      },
      {
        label: "Version",
        id: "octopusVersion"
      },
      {
        label: "Package ID",
        id: "packageId"
      },
      {
        label: "Rollback to a Previous Version",
        id: "isRollback"
      },
      {
        label: "XML Configuration Transformed Variable Value",
        id: "xmlConfigTransformVariableValue",
        regexDefinitionName: "pathField",
        maxLength: 100
      },
      {
        label: "Structured Configuration Variables Path",
        id: "structuredConfigVariablesPath",
        regexDefinitionName: "pathField",
        maxLength: 100
      },
      {
        label: "Deployment Variables",
        id: "deploymentVariables"
      },
      {
        label: "Specify Deployment Variables",
        id: "specifyDepVariables"
      },
      {
        label: "Physical Path",
        id: "octopusPhysicalPath",
        regexDefinitionName: "pathField",
        maxLength: 100
      },
      {
        label: "Website Name",
        id: "webSiteName"
      },
      {
        label: "Application Pool Name",
        id: "applicationPoolName"
      },
      {
        label: "Protocol",
        id: "protocol"
      },
      {
        label: "Binding Port",
        id: "port",
        regexDefinitionName: "numericalField",
        maxLength: 50
      },
      {
        label: "Deployment Lifecycle",
        id: "lifecycleId",
        isRequired: true
      },
      {
        label: "Bindings",
        id: "bindings",
        maxItems: 15,
      },
      {
        label: "Script Type",
        id: "scriptSource"
      },
      {
        label: "Script File Name",
        id: "scriptFileName"
      },
      {
        label: "Script Parameters",
        id: "scriptParameters"
      },
      {
        label: "Opsera Script Library",
        id: "scriptId"
      },
      {
        label: "Context Path",
        id: "contextPath"
      },
      {
        label: "Custom Deployment Scripts",
        id: "customDeploymentScriptsEnabled"
      },
      {
        label: "Pre-Deployment Script",
        id: "preDeploymentScriptId"
      },
      {
        label: "Deployment Script",
        id: "deploymentScriptId"
      },
      {
        label: "Post-Deployment Script",
        id: "postDeploymentScriptId"
      },
      {        
        id: "tomcatManagerDetails"
      },
      {
        label: "Tomcat Manager",
        id: "tomcatManagerId"
      },      
      {
        label: "Deploy the Extracted Package",
        id: "deployExtractedPackage"
      },
      {
        label: "Deployed Package File Name",
        id: "deployedPackageFileName",
        regexDefinitionName: "genericFileName",
        maxLength: 64
      },
      {
        label: "Use Custom Deployment Directory",
        id: "useCustomDeploymentDirectory"
      },
      {
        label: "Deployment Directory",
        id: "deploymentDirectory",
        regexDefinitionName: "pathField",
        maxLength: 100
      },
      {
        label: "Purge",
        id: "purge"
      },
      {
        label: "Files Excluded from Purge",
        id: "excludeFromPurge",
        regexDefinitionName: "octopusFileList",
        formText: "A newline-separated list of file or directory names, relative to the installation directory"
      },
      {
        label: "IIS Authentication",
        id: "iisAuthentication",
      },
      {
        label: ".Net CLR Version",
        id: "dotNetClrVersion",
      },
      {
        label: "IIS Authentication Type",
        id: "applicationPoolIdentityType",
      },
      {
        label: "Application Pool Identity Username",
        id: "applicationPoolIdentityUsername",
        maxLength: 50
      },
      {
        label: "Application Pool Identity Password",
        id: "applicationPoolIdentityPassword",
      },
      {
        label: "Start Application Pool",
        id: "startApplicationPool",
      },
      {
        label: "Azure Tool",
        id: "azureToolId",
      },
      {
        label: "Azure Repo",
        id: "azureRepoName",
        // isRequired: true
      },
      {
        label: "Project Group",
        id: "projectGroupId",
      },
      {
        label: "Channel",
        id: "channelId",
      },
      {
        label: "Project Type",
        id: "projectType",
        isRequired: true
      },
      {
        label: "Tenant",
        id: "tenantId",        
      },
      {
        label: "Environment Configurations",
        id: "environmentList",
        formText: `
          This feature is currently limited to a maximum of 30 environments.  
          If you have a need to exceed that limit, please contact Opsera with details on specific requirements.
        `,
        maxItems: 30,
      },
      {
        label: "Tenant Configurations",
        id: "tenantList",
        formText: `
          This feature is currently limited to a maximum of 10 tenants.  
          If you have a need to exceed that limit, please contact Opsera with details on specific requirements.
        `,
        maxItems: 30,
      },
      {
        id: "deploymentProcessId"
      },
      {
        id: "tenantedDeploymentMode"
      },
      {
        id: "customParameters"
      }
    ],
  newObjectFields:
      {
        isFullBackup: false,
        toolURL: "",
        isRollback: false,
        octopusApiKey: "",
        spaceName: "",
        projectName: "",
        environmentName: "",
        octopusToolId: "",
        spaceId: "",
        projectId: "",
        specifyDepVariables: false,
        projectDescription : "",
        environmentId: "",
        ecrPushStepId: "",
        namespace : "",
        octopusTargetRoles: "",
        octopusPlatformType: "",
        octopusDeploymentType: "",
        octopusFeedId: "",
        deploymentId : "",
        octopusVersion: "",
        packageId: "",
        octopusPhysicalPath: "",
        deploymentVariables: [],
        xmlConfigTransformVariableValue: "",
        structuredConfigVariablesPath: "",
        webSiteName: "",
        applicationPoolName: "",
        protocol: "HTTP",
        port: "80",
        lifecycleId: "",
        bindings: "",
        scriptSource: "",
        scriptParameters: "",
        scriptFileName: "",
        scriptId: "",
        contextPath: "",
        customDeploymentScriptsEnabled: false,
        preDeploymentScriptId: "",
        deploymentScriptId: "",
        postDeploymentScriptId: "",
        tomcatManagerDetails: {},
        tomcatManagerId: "",
        deployExtractedPackage: false,
        deployedPackageFileName: "",
        useCustomDeploymentDirectory: false,
        deploymentDirectory: "",
        purge: false,
        excludeFromPurge: "",
        iisAuthentication: [],
        dotNetClrVersion: "",
        applicationPoolIdentityType: "",
        applicationPoolIdentityUsername: "",
        applicationPoolIdentityPassword : {},
        startApplicationPool : false,
        azureToolId: "",
        projectGroupId: "",
        channelId: "",
        projectType: "OPSERA_MANAGED",
        tenantId: "",
        environmentList: [],
        tenantList: [],
        customParameters: []
      }
  };
  
  export default octopusStepFormMetadata;