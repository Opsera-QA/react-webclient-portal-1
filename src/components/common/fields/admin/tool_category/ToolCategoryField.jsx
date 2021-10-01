import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {getTaskTypeLabel} from "components/tasks/task.types";

// TODO: Pull category name from id
function ToolCategoryField({model, fieldName, className, showLabel }) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field} showLabel={showLabel}/>
        {/*<span>{getTaskTypeLabel(model?.getData(fieldName))}</span>*/}
      </div>
    </FieldContainer>
  );
}

ToolCategoryField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ToolCategoryField;