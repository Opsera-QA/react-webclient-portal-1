import React from "react";
import PropTypes from "prop-types";
import PipelineTypeFilter from "components/common/filters/admin/templates/pipeline_type/PipelineTypeFilter";

function InlinePipelineTypeFilter({ filterModel, setFilterModel, fieldName, className, loadData, isLoading }) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <PipelineTypeFilter
      className={className}
      filterDto={filterModel}
      setFilterDto={setFilterModel}
      loadingData={isLoading}
      fieldName={fieldName}
      setDataFunction={validateAndSetData}
      inline={true}
    />
  );
}


InlinePipelineTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

InlinePipelineTypeFilter.defaultProps = {
  fieldName: "type"
};

export default InlinePipelineTypeFilter;


