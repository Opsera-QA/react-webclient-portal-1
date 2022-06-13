import React from "react";
import PropTypes from "prop-types";
import ToolIdentifierFilter from "components/common/filters/tools/tool_identifier/ToolIdentifierFilter";

function InlineToolIdentifierFilter(
  {
    filterModel,
    setFilterModel,
    fieldName,
    className,
    loadData,
    isLoading,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    filterModel.setData(fieldName, selectedOption?.identifier);
    filterModel.setData("toolIdentifierName", selectedOption?.name);
    loadData({...filterModel});
  };

  return (
    <ToolIdentifierFilter
      className={className}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      loadingData={isLoading}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      inline={true}
    />
  );
}


InlineToolIdentifierFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

InlineToolIdentifierFilter.defaultProps = {
  fieldName: "toolIdentifier",
};

export default InlineToolIdentifierFilter;


