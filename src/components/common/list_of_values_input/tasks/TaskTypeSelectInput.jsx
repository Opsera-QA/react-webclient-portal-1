import React, { useContext } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import {TASK_TYPES} from "components/tasks/task-types";

export const productionTaskTypes = [
  {text: "Salesforce Organization Sync", value: TASK_TYPES.SYNC_SALESFORCE_REPO},
  {text: "Salesforce Branch Structuring", value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE},
  {text: "Git to Git Sync", value: TASK_TYPES.SYNC_GIT_BRANCHES},
  {text: "AWS: Create ECS Cluster", value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER},
  {text: "AWS: Create ECS Service", value: TASK_TYPES.AWS_CREATE_ECS_SERVICE},
  {text: "AWS: Create Lambda Function", value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION},
];

export const nonProductionTaskTypes = [
  {text: "Salesforce Organization Sync", value: TASK_TYPES.SYNC_SALESFORCE_REPO},
  {text: "Generate Certificate for SFDX", value: TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION},
  {text: "Salesforce Branch Structuring", value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE},
  {text: "Git to Git Sync", value: TASK_TYPES.SYNC_GIT_BRANCHES},
  {text: "AWS: Create ECS Cluster", value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER},
  {text: "AWS: Create ECS Service", value: TASK_TYPES.AWS_CREATE_ECS_SERVICE},
  {text: "AWS: Create Lambda Function", value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION},
  // {name: "Create Azure AKS Cluster", value: TASK_TYPES.AZURE_CLUSTER_CREATION},
];


function TaskTypeSelectInput({ fieldName, model, setModel, setDataFunction, disabled }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={featureFlagHideItemInProd() !== false ? productionTaskTypes : nonProductionTaskTypes}
      setDataFunction={setDataFunction}
      placeholderText={"Select Task Type"}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

TaskTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

TaskTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default TaskTypeSelectInput;