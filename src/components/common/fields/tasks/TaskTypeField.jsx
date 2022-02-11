import React from "react";
import PropTypes from "prop-types";
import {getTaskTypeLabel} from "components/tasks/task.types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";

function TaskTypeField({model, fieldName, className, showLabel }) {
  return (
    <ConstantFieldBase
      getLabelFunction={getTaskTypeLabel}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

TaskTypeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default TaskTypeField;