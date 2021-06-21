import regexHelpers from "utils/regexHelpers";

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
        isRequired: true,
        regexValidator: regexHelpers.regexTypes.generalText,
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
        label: "Project ID",
        id: "projectId",
      },
      {
        label: "Project Description",
        id: "projectDescription",
        isRequired: true,
        regexValidator: regexHelpers.regexTypes.generalText,
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
        regexValidator: regexHelpers.regexTypes.generalText,
        maxLength: 100
      },
      {
        label: "Artifact Step",
        id: "ecrPushStepId",
        isRequired: true
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
        regexValidator: regexHelpers.regexTypes.pathField,
        maxLength: 100
      },
      {
        label: "Structured Configuration Variables Path",
        id: "structuredConfigVariablesPath",
        regexValidator: regexHelpers.regexTypes.pathField,
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
        regexValidator: regexHelpers.regexTypes.pathField,
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
        regexValidator: regexHelpers.regexTypes.numericalField,
        maxLength: 50
      },
      {
        label: "Deployment Lifecycle",
        id: "lifecycleId",
        isRequired: true
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
      }
  };
  
  export default octopusStepFormMetadata;