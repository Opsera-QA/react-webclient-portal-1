import { dataParsingHelper } from "../../../../common/helpers/data/dataParsing.helper";
import modelHelpers from "../../../../common/model/modelHelpers";

export const customSettingTaskSalesforceConfigurationMetadata = {
  type: "Custom Settings Task Salesforce Configuration",
  fields: [
    {
      label: "Salesforce Source Org",
      id: "sourceToolId",
      isRequired: true,
    },
    {
      label: "Salesforce Target Org",
      id: "targetToolId",
      isRequired: true,
    },
  ],
  newObjectFields: {
    sourceToolId: "",
    targetToolId: "",
  }
};

const salesforceCustomSettingMigrationTaskMetadata = {
  type: "Salesforce Custom Setting Migration Task Configuration",
  fields: [
    {
      label: "Migration Type",
      id: "taskType",
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
        const customSettingTaskSalesforceConfigurationModel = modelHelpers.parseObjectIntoModel(sfdc, customSettingTaskSalesforceConfigurationMetadata);
        return customSettingTaskSalesforceConfigurationModel?.getErrors();
      },
    },
    {
      label: "Action",
      id: "action",
      isRequiredFunction: (model) => {
        return (model != null && model.getData("taskType") !== "ORG_TO_FILE");
      },
    },
  ],
  newObjectFields: {
    jobType: "CUSTOM_SETTING_MIGRATION",
    taskType: "",
    sfdc: {},
    action: "",
  }
};

export default salesforceCustomSettingMigrationTaskMetadata;