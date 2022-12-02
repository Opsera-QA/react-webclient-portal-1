import React from "react";
import PropTypes from "prop-types";
import PipelineInstructionsStatusFilterSelectInput
  from "components/common/list_of_values_input/workflow/instructions/status/PipelineInstructionsStatusFilterSelectInput";

export default function InlinePipelineInstructionsStatusFilterSelectInput(
  {
    filterModel,
    setFilterModel,
    className,
    fieldName,
    loadData,
  }) {
  if (filterModel == null) {
    return null;
  }

  return (
    <PipelineInstructionsStatusFilterSelectInput
      className={className}
      fieldName={fieldName}
      inline={true}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      loadDataFunction={loadData}
    />
  );
}

InlinePipelineInstructionsStatusFilterSelectInput.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
};

InlinePipelineInstructionsStatusFilterSelectInput.defaultProps = {
  fieldName: "status"
};


