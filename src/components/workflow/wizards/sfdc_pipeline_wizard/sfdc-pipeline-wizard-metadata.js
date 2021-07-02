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
      label: "SFDC Rule List",
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
      label: "SFDC Tool ID",
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
      label: "Modified Files Origin",
      id: "modifiedFilesOrigin",
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
    stepId: "",
    sfdcToolId: "",
    isOrgToOrg: false,
    isProfiles: false,
    modifiedFilesOrigin: "sfdc",
    unitTestSteps: [],
    gitTaskId: "",
    xml: "",
    destructiveXml: "",
    fromGitTasks: false // TODO: Remove if irrelevant
  }
};

export default sfdcPipelineWizardMetadata;