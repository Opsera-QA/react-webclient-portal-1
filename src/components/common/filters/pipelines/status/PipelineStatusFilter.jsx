import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

export const PIPELINE_STATUSES = [
  {text: "All", value: ""},
  {text: "Success", value: "success"},
  {text: "Failed", value: "failed"},
  {text: "Running", value: "running"},
];

function PipelineStatusFilter({ filterModel, setFilterModel, setDataFunction, className, fieldName, inline}) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      fieldName={fieldName}
      inline={inline}
      textField={inline === true ? (selectOption) => {return `Status: ${selectOption?.text}`;} : undefined}
      setDataObject={setFilterModel}
      setDataFunction={setDataFunction}
      placeholderText={"Select Pipeline Status"}
      dataObject={filterModel}
      selectOptions={PIPELINE_STATUSES}
    />
  );
}

PipelineStatusFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

PipelineStatusFilter.defaultProps = {
  fieldName: "status"
};

export default PipelineStatusFilter;


