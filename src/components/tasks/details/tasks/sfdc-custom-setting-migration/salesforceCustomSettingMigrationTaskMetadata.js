import { dataParsingHelper } from "../../../../common/helpers/data/dataParsing.helper";
import modelHelpers from "../../../../common/model/modelHelpers";
import { MIGRATION_TYPES } from "./inputs/SalesforceCustomSettingTaskTypeSelectInput";

export const customSettingTaskSalesforceConfigurationMetadata = {
  type: "Custom Settings Task Salesforce Configuration",
  fields: [
    {
      label: "Salesforce Source Org",
      id: "sourceToolId",
      isRequiredFunction: (model) => {
        console.log(model.getPersistData());
        return (
          model != null &&
          model.getData("taskType") !==
            MIGRATION_TYPES.MIGRATION_FROM_CSV_TO_ORG
        );
      },
    },
    {
      label: "Salesforce Target Org",
      id: "targetToolId",
      isRequiredFunction: (model) => {
        console.log(model.getPersistData());
        return (
          model != null &&
          model.getData("taskType") !==
            MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV
        );
      },
    },
  ],
  newObjectFields: {
    sourceToolId: "",
    targetToolId: "",
    taskType: "",
  },
};

const salesforceCustomSettingMigrationTaskMetadata = {
  type: "Salesforce Custom Setting Migration Task Configuration",
  fields: [
    {
      label: "Migration Type",
      id: "taskType", // can we change this to migrationType?
      isRequired: true,
    },
    {
      label: "Custom Setting Migration Salesforce Configuration",
      id: "sfdc",
      getFieldErrorsFunction: (model) => {
        if (model == null || model.getData == null) {
          return [`No model was passed in. Cannot evaluate field validity.`];
        }

        const sfdc = dataParsingHelper.parseObject(model?.getData("sfdc"));
        const customSettingTaskSalesforceConfigurationModel =
          modelHelpers.parseObjectIntoModel(
            sfdc,
            customSettingTaskSalesforceConfigurationMetadata,
          );
        return customSettingTaskSalesforceConfigurationModel?.getErrors();
      },
    },
    {
      label: "Action",
      id: "action",
      isRequiredFunction: (model) => {
        return (
          model != null &&
          model.getData("taskType") !==
            MIGRATION_TYPES.MIGRATION_FROM_ORG_TO_CSV
        );
      },
    },
  ],
  newObjectFields: {
    jobType: "CUSTOM_SETTING_MIGRATION",
    taskType: "",
    sfdc: {},
    action: "",
  },
};

export default salesforceCustomSettingMigrationTaskMetadata;
