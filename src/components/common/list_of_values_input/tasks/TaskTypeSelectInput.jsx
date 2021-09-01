import React, { useContext } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";

export const productionTaskTypes = [
  {text: "SFDC Org sync", value: "sync-sfdc-repo"},
  {text: "SFDC Branch Structuring", value: "sync-branch-structure"},
  {text: "GIT to GIT Sync", value: "sync-git-branches"}
];

export const nonProductionTaskTypes = [
  {text: "SFDC Org sync", value: "sync-sfdc-repo"},
  {text: "Generate Certificate for SFDX", value: "sfdc-cert-gen"},
  {text: "SFDC Branch Structuring", value: "sync-branch-structure"},
  {text: "GIT to GIT Sync", value: "sync-git-branches"},
  {text: "Create AWS ECS Cluster", value: "ecs_cluster_creation"},
  {text: "Create AWS ECS Service", value: "ecs_service_creation"},
  {text: "Create AWS Lambda Function", value: "lambda_function_creation"},
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