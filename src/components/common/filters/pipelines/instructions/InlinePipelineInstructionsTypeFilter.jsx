import React from "react";
import PropTypes from "prop-types";
import PipelineInstructionsTypeFilter
  from "components/common/filters/pipelines/instructions/PipelineInstructionsTypeFilter";

export default function InlinePipelineInstructionsTypeFilter(
  {
    filterModel,
    setFilterModel,
    fieldName,
    className,
    loadData,
    isLoading,
  }) {
  const validateAndSetData = (fieldName, selectedOption) => {
    filterModel.setData(fieldName, selectedOption?.value);
    loadData(filterModel);
  };

  return (
    <PipelineInstructionsTypeFilter
      className={className}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      loadingData={isLoading}
      fieldName={fieldName}
      setDataFunction={validateAndSetData}
      inline={true}
    />
  );
}


InlinePipelineInstructionsTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

InlinePipelineInstructionsTypeFilter.defaultProps = {
  fieldName: "type",
};


