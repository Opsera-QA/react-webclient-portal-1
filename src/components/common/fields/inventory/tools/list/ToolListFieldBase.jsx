import React from "react";
import PropTypes from "prop-types";
import SelectedToolList from "components/common/list_of_values_input/inventory/tools/selection/SelectedToolList";

export default function ToolListFieldBase(
  {
    model,
    fieldName,
    customTitle,
  }) {
  return (
    <SelectedToolList
      model={model}
      fieldName={fieldName}
      currentData={model?.getArrayData(fieldName)}
      disabled={true}
      customTitle={customTitle}
      className={"my-2"}
    />
  );
}

ToolListFieldBase.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  customTitle: PropTypes.string,
};
