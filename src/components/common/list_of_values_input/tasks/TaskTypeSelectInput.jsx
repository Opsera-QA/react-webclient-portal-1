import React, { useContext } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import {TASK_TYPE_LABELS, TASK_TYPES} from "components/tasks/task.types";

export const productionTaskTypes = [
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO, value: TASK_TYPES.SYNC_SALESFORCE_REPO},
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE, value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE},
  {text: TASK_TYPE_LABELS.SYNC_GIT_BRANCHES, value: TASK_TYPES.SYNC_GIT_BRANCHES},
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER, value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER},
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE, value: TASK_TYPES.AWS_CREATE_ECS_SERVICE},
  {text: TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION, value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION},
];

export const nonProductionTaskTypes = [
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO, value: TASK_TYPES.SYNC_SALESFORCE_REPO},
  {text: TASK_TYPE_LABELS.SALESFORCE_CERTIFICATE_GENERATION, value: TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION},
  {text: TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE, value: TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE},
  {text: TASK_TYPE_LABELS.SYNC_GIT_BRANCHES, value: TASK_TYPES.SYNC_GIT_BRANCHES},
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER, value: TASK_TYPES.AWS_CREATE_ECS_CLUSTER},
  {text: TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE, value: TASK_TYPES.AWS_CREATE_ECS_SERVICE},
  {text: TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION, value: TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION},
  {text: TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION, value: TASK_TYPES.AZURE_CLUSTER_CREATION},
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