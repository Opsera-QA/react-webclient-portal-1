import { dataParsingHelper } from "../../../../common/helpers/data/dataParsing.helper";
import modelHelpers from "../../../../common/model/modelHelpers";

export const dataSeedingTaskSalesforceConfigurationMetadata = {
  type: "Data Seeding Salesforce Configuration",
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
  },
};

const dataSeedingMigrationTaskMetadata = {
  type: "Salesforce Data Seeding Task Configuration",
  fields: [
    {
      label: "Custom Setting Migration Salesforce Configuration",
      id: "sfdc",
      getFieldErrorsFunction: (model) => {
        if (model == null || model.getData == null) {
          return [`No model was passed in. Cannot evaluate field validity.`];
        }

        const sfdc = dataParsingHelper.parseObject(model?.getData("sfdc"));
        const dataSeedingTaskSalesforceConfigurationModel =
          modelHelpers.parseObjectIntoModel(
            sfdc,
            dataSeedingTaskSalesforceConfigurationMetadata,
          );
        return dataSeedingTaskSalesforceConfigurationModel?.getErrors();
      },
    },
    {
      label: "Action",
      id: "action",
      isRequired: true,
    },
  ],
  newObjectFields: {
    jobType: "DATA_SEEDING",
    sfdc: {},
    action: "",
  },
};

export default dataSeedingMigrationTaskMetadata;
