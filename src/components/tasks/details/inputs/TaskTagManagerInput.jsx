import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import InlineTagManagerInput from "components/common/inputs/tags/InlineTagManagerInput";
import tagTypeConstants from "@opsera/definitions/constants/settings/tags/tagType.constants";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import useTaskActions from "hooks/workflow/tasks/useTaskActions";

export default function TaskTagManagerInput(
  {
    fieldName,
    taskModel,
    setTaskModel,
    workflowStatus,
    visible,
    disabled,
    className,
    fieldClassName,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const [modelCopy, setModelCopy] = useState(undefined);
  const canEditPipelineTags = TaskRoleHelper.canUpdateTask(userData, taskModel?.getOriginalData());
  const taskActions = useTaskActions();

  useEffect(() => {
    setModelCopy(taskModel?.clone());
  }, []);

  const handleSaveFunction = async () => {
    const response = await taskActions.updateTaskField(
      modelCopy?.getMongoDbId(),
      fieldName,
      modelCopy?.getData(fieldName),
    );

    taskModel?.setData(fieldName, modelCopy?.getData(fieldName));
    setTaskModel({...taskModel});
    taskModel?.clearChangeMap();
    setModelCopy({...taskModel?.clone()});

    return response;
  };

  if (modelCopy == null) {
    return null;
  }

  return (
    <InlineTagManagerInput
      model={modelCopy}
      setModel={setModelCopy}
      fieldName={fieldName}
      disabled={
        canEditPipelineTags !== true
          || workflowStatus === "running"
          || disabled
      }
      visible={visible}
      className={className}
      handleSaveFunction={handleSaveFunction}
      fieldClassName={fieldClassName}
      type={tagTypeConstants.TAG_TYPES.TASK}
    />
  );
}

TaskTagManagerInput.propTypes = {
  fieldName: PropTypes.string,
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  workflowStatus: PropTypes.string,
  fieldClassName: PropTypes.string,
};

TaskTagManagerInput.defaultProps = {
  fieldName: "tags",
};
