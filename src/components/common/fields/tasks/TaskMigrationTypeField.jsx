import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import {
  getMigrationTypeLabel
} from "../../../tasks/details/tasks/sfdc-custom-setting-migration/inputs/SalesforceCustomSettingTaskTypeSelectInput";

function TaskMigrationTypeField({model, fieldName, className, showLabel }) {
  return (
    <ConstantFieldBase
      getLabelFunction={getMigrationTypeLabel}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

TaskMigrationTypeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default TaskMigrationTypeField;