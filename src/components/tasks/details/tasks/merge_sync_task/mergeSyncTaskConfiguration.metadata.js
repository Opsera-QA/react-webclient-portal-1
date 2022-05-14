import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import {
  mergeSyncTaskGitConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/git_to_git/mergeSyncTaskGitConfiguration.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import {
  mergeSyncTaskSalesforceConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/mergeSyncTaskSalesforceConfiguration.metadata";

// TODO: The complex validators basically prove that we should rework the way we handle task configuration panels.
export const mergeSyncTaskConfigurationMetadata = {
  type: "Merge Sync Task Configuration",
  fields: [
    {
      label: "Merge Type",
      id: "jobType",
      isRequired: true,
    },
    {
      label: "Merge Sync Git Configuration",
      id: "git",
      getFieldErrorsFunction: (model) => {
        if (model == null || model.getData == null) {
          return [`No model was passed in. Cannot evaluate field validity.`];
        }

        const git = dataParsingHelper.parseObject(model?.getData("git"));
        const mergeSyncTaskGitConfigurationModel = modelHelpers.parseObjectIntoModel(git, mergeSyncTaskGitConfigurationMetadata);
        return mergeSyncTaskGitConfigurationModel?.getErrors();
      },
    },
    {
      label: "Merge Sync Salesforce Configuration",
      id: "sfdc",
      getFieldErrorsFunction: (model) => {
        if (model == null || model.getData == null) {
          return [`No model was passed in. Cannot evaluate field validity.`];
        }

        const sfdc = dataParsingHelper.parseObject(model?.getData("sfdc"));
        const mergeSyncTaskSalesforceConfigurationModel = modelHelpers.parseObjectIntoModel(sfdc, mergeSyncTaskSalesforceConfigurationMetadata);
        return mergeSyncTaskSalesforceConfigurationModel?.getErrors();
      },
    },
  ],
  newObjectFields: {
    jobType: "",
    git: {},
    sfdc: {},
  }
};