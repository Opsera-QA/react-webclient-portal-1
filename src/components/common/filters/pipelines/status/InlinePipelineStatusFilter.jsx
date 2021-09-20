import React from "react";
import PropTypes from "prop-types";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";

function InlinePipelineStatusFilter({ filterModel, setFilterModel, className, fieldName, loadData}) {
  const setDataFunction = (fieldName, value) => {
    let newModel = filterModel;
    newModel.setData(fieldName, value);
    loadData(newModel);
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <PipelineStatusFilter
      className={className}
      fieldName={fieldName}
      inline={true}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      setDataFunction={setDataFunction}
    />
  );
}

InlinePipelineStatusFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
};

InlinePipelineStatusFilter.defaultProps = {
  fieldName: "status"
};

export default InlinePipelineStatusFilter;


