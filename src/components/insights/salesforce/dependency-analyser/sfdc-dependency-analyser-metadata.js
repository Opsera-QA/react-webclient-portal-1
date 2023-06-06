import React from "react";

const sfdcDataAnalyserMetadata = {
  idProperty: "_id",
  type: "Sfdc Dependency Analyser Metadata",
  activeField: "active",
  fields: [
    {
      label: "Reference Type",
      id: "referenceType",
      formText: "Fetch dependent components that is referenced/used or refers to/uses by the selected metadata component"
    },
    {
      label: "Choose Source Org",
      id: "modifiedFilesOrigin",
      formText: "Choose the retrieval/deployment of components to happen either from Salesforce Organization/Git Branch"
    },
    {
      label: "Component Types",
      id: "selectedComponentTypes",
    },
    {
      label: "Selected Component Types",
      id: "selected",
    },
    {
      label: "From",
      id: "fromDate",
      isRequired: true,
    },
    {
      label: "To",
      id: "toDate",
      isRequired: true,
    },
    {
      label: "Mongo Record ID",
      id: "recordId",
    },
    {
      label: "Profile Component Rule List",
      id: "profileComponentsRuleList",
    },
    {
      label: "Salesforce Rule List",
      id: "sfdcModifiedRuleList",
    },
    {
      label: "Git Rule List",
      id: "gitModifiedRuleList",
    },
    {
      label: "Namespace Prefix",
      id: "namespacePrefix",
      formText: "Managed components with given NamespacePrefix will be included. Custom components prefixed with the given Prefix will be included"
    },
    {
      label: "Pipeline ID",
      id: "pipelineId",
    },
    {
      label: "Pipeline Step ID",
      id: "stepId",
    },
    {
      label: "Salesforce Org",
      id: "sfdcToolId",
    },
    {
      label: "Is Org to Org?",
      id: "isOrgToOrg",
    },
    {
      label: "Is Profiles?",
      id: "isProfiles",
    },
    {
      label: "Is Translations?",
      id: "isTranslations",
    },
    {
      label: "Is SFDX?",
      id: "isSfdx",
    },
    {
      label: "Unit Test Steps",
      id: "unitTestSteps",
    },
    {
      label: "Task ID",
      id: "gitTaskId",
    },
    {
      label: "XML",
      id: "xml",
    },
    {
      label: "Destructive XML",
      id: "destructiveXml",
    },
    {
      label: "Wizard Launched from Git Tasks",
      id: "fromGitTasks",
    },
    {
      label: "Component Selection from File Upload",
      id: "fromFileUpload",
    },
    {
      label: "Select a past run to use its XML for deployment",
      id: "selectedRunNumber",
    },
    {
      label: "XML File Content",
      id: "xmlFileContent",
    },
    {
      label: "CSV File Content",
      id: "csvFileContent",
    },
    {
      label: "RollBack",
      id: "isRollBack",
    },
    {
      label: "Include Dependencies",
      id: "includeDependencies",
      formText: `
        By default, all CustomObject dependencies are included in the deployment while selecting components from the Git Side. 
        By disabling this toggle, dependencies will be excluded unless explicitly selected.
      `
    },
    {
      label: "Run Count",
      id: "run_count",
    },
    {
      label: "Branch",
      id: "gitBranch",
    },
    {
      label: "Salesforce Account Name",
      id: "accountUsername",
    },
    {
      label: "Ignore Warning",
      id: "ignoreWarning"
    },
    {
      label: "Salesforce API Version",
      id: "apiVersion"
    },
    {
      label: "Repository",
      id: "repository",
    },
    {
      label: "Service",
      id: "service",
    },
    {
      label: "Workspace",
      id: "workspace",
    },
    {
      label: "Git Account",
      id: "gitToolId",
    },
    {
      label: "Salesforce Destination Org",
      id: "sfdcDestToolId",
    },
  ],
  newObjectFields: {
    referenceType: "referenceBy",
    selectedComponentTypes: [],
    fromDate: new Date(new Date().setHours(0,0,0,0)),
    toDate: new Date(),
    recordId: "",
    sfdcToolId: "",
    isTranslations: false,
    xml: "",
    destructiveXml: "",
    xmlFileContent: "",
    selectedRunNumber: "",
    csvFileContent: [],
    fromFileUpload: false,
    isRollBack: false,
    includeDependencies: true,
    gitBranch: "",
    accountUsername: "",
  }
};

export default sfdcDataAnalyserMetadata;