import { TASK_TYPES } from "components/tasks/task.types";

export const mergeSyncTaskSalesforceConfigurationMetadata = {
  type: "Merge Sync Task Salesforce Configuration",
  fields: [
    {
      label: "Salesforce Configurator Tool",
      id: "sourceToolId",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC;
      },
    },
    {
      label: "Salesforce Target Branch Tool",
      id: "targetToolId",
      formText: "Salesforce Target Branch Tool cannot match Salesforce Source Branch Tool.",
    },
    {
      label: "Include Package XML",
      id: "includePackageXml"
    },
    {
      label: "Package XML Reference Path",
      id: "packageXmlReferencePath",
      regexDefinitionName: "pathField",
      formText: `
      Specify where the Package XML needs to be copied or merged with existing Package XML. 
      In order to have the Package XML updated in current directory, give the path as '.' (dot).
      `,
      isRequiredFunction: (model) => {
        return model?.getData("includePackageXml") === true;
      },
    },
    {
      label: "Jira Tool",
      id: "jiraToolId",
    },
    {
      label: "Jira Project",
      id: "jiraProjectKey",
    },
    {
      label: "Jira Ticket",
      id: "jiraIssueId",
    },
  ],
  newObjectFields: {
    sourceToolId: "",
    targetToolId: "",
    jobType: "",
    includePackageXml: false,
    packageXmlReferencePath: "",
    jiraToolId: "",
    jiraProjectKey: "",
    jiraIssueId: "",
  }
};