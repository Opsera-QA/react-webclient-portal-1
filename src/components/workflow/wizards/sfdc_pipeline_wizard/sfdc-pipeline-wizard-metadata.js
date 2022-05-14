import sfdcRuleMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/rules/sfdc-rule-metadata";
import React from "react";

const sfdcPipelineWizardMetadata = {
  idProperty: "_id",
  type: "Sfdc Pipeline Wizard Metadata",
  activeField: "active",
  fields: [
    {
      label: "Included Component Types",
      id: "includedComponentTypes",
      formText: "Which component types should be included?"
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
      label: "Salesforce Tool ID",
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
      label: "Git Task ID",
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
      label: "Past Pipeline Run",
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
      label: "Git Branch",
      id: "gitBranch",
    },
    {
      label: "Salesforce Account Name",
      id: "accountUsername",
    },
  ],
  newObjectFields: {
    includedComponentTypes: "all",
    selectedComponentTypes: [],
    fromDate: new Date(new Date().setHours(0,0,0,0)),
    toDate: new Date(),
    profileComponentsRuleList: [{...sfdcRuleMetadata.newObjectFields}],
    gitModifiedRuleList: [{...sfdcRuleMetadata.newObjectFields}],
    sfdcModifiedRuleList: [{...sfdcRuleMetadata.newObjectFields}],
    recordId: "",
    namespacePrefix: "",
    pipelineId: "",
    runCount: 1,
    stepId: "",
    sfdcToolId: "",
    isOrgToOrg: false,
    isProfiles: false,
    isTranslations: false,
    modifiedFilesOrigin: "sfdc",
    unitTestSteps: [],
    gitTaskId: "",
    xml: "",
    destructiveXml: "",
    xmlFileContent: "",
    selectedRunNumber: "",
    csvFileContent: [],
    fromGitTasks: false, // TODO: Remove if irrelevant
    fromFileUpload: false,
    isRollBack: false,
    includeDependencies: true,
    gitBranch: "",
    accountUsername: "",
    isSfdx: false,
  }
};

export default sfdcPipelineWizardMetadata;