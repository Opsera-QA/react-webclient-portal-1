import React from "react";
import sfdcRuleMetadata from "../../../workflow/wizards/sfdc_pipeline_wizard/rules/sfdc-rule-metadata";

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
      label: "Salesforce Dependency Rule List",
      id: "sfdcDependencyFileRuleList",
    },
    {
      label: "Salesforce Org",
      id: "sfdcToolId",
    },
    {
      label: "Is SFDX?",
      id: "isSfdx",
    },
    {
      label: "XML",
      id: "xml",
    },
    {
      label: "Component Selection from File Upload",
      id: "fromFileUpload",
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
      label: "Ignore Warning",
      id: "ignoreWarning"
    },
    {
      label: "Salesforce API Version",
      id: "apiVersion"
    },
  ],
  newObjectFields: {
    referenceType: "referenceBy",
    selectedComponentTypes: [],
    sfdcModifiedRuleList: [{...sfdcRuleMetadata.newObjectFields}],
    sfdcDependencyFileRuleList: [{...sfdcRuleMetadata.newObjectFields}],
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
    includeDependencies: true,
  }
};

export default sfdcDataAnalyserMetadata;