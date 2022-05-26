import React, { useContext } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import {TASK_TYPE_LABELS, TASK_TYPES} from "components/tasks/task.types";

export const productionTaskTypes = [
  // AWS
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER, value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER, category: "AWS"},
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE, value: TASK_TYPES.AWS_CREATE_ECS_SERVICE, category: "AWS"},
  {text: TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION, value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION, category: "AWS"},

  // Azure
  {text: TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION, value: TASK_TYPES.AZURE_CLUSTER_CREATION, category: "Azure"},

  // Git
  {text: TASK_TYPE_LABELS.GIT_TO_GIT_MERGE_SYNC, value: TASK_TYPES.GIT_TO_GIT_MERGE_SYNC, category: "Git"},
  {text: TASK_TYPE_LABELS.SYNC_GIT_BRANCHES, value: TASK_TYPES.SYNC_GIT_BRANCHES, category: "Git"},

  // Salesforce
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE, value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO, value: TASK_TYPES.SYNC_SALESFORCE_REPO, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION, value: TASK_TYPES.SALESFORCE_BULK_MIGRATION, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC, value: TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY, value: TASK_TYPES.SALESFORCE_QUICK_DEPLOY, category: "Salesforce"},

  //snaplogic
  {text: TASK_TYPE_LABELS.SNAPLOGIC_TASK, value: TASK_TYPES.SNAPLOGIC_TASK, category: "Compliance"},
];

export const nonProductionTaskTypes = [
  // AWS
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER, value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER, category: "AWS"},
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE, value: TASK_TYPES.AWS_CREATE_ECS_SERVICE, category: "AWS"},
  {text: TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION, value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION, category: "AWS"},

  // Azure
  {text: TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION, value: TASK_TYPES.AZURE_CLUSTER_CREATION, category: "Azure"},

  // Git
  {text: TASK_TYPE_LABELS.GIT_TO_GIT_MERGE_SYNC, value: TASK_TYPES.GIT_TO_GIT_MERGE_SYNC, category: "Git"},
  {text: TASK_TYPE_LABELS.SYNC_GIT_BRANCHES, value: TASK_TYPES.SYNC_GIT_BRANCHES, category: "Git"},
  {text: TASK_TYPE_LABELS.GITSCRAPER, value: TASK_TYPES.GITSCRAPER, category: "Compliance"},

  // Salesforce
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE, value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION, value: TASK_TYPES.SALESFORCE_BULK_MIGRATION, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SALESFORCE_CERTIFICATE_GENERATION, value: TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO, value: TASK_TYPES.SYNC_SALESFORCE_REPO, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC, value: TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC, category: "Salesforce"},
  {text: TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY, value: TASK_TYPES.SALESFORCE_QUICK_DEPLOY, category: "Salesforce"},

  //snaplogic
  {text: TASK_TYPE_LABELS.SNAPLOGIC_TASK, value: TASK_TYPES.SNAPLOGIC_TASK, category: "Git"},

];

function TaskTypeSelectInputBase({ fieldName, model, setModel, isLoading, setDataFunction, disabled }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={
        featureFlagHideItemInProd() !== false
          ? productionTaskTypes
          : nonProductionTaskTypes
      }
      setDataFunction={setDataFunction}
      busy={isLoading}
      placeholderText={"Select Task Type"}
      valueField={"value"}
      textField={"text"}
      groupBy={"category"}
      disabled={disabled}
    />
  );
}

TaskTypeSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  isLoading: PropTypes.bool,
};

TaskTypeSelectInputBase.defaultProps = {
  fieldName: "type",
};

export default TaskTypeSelectInputBase;