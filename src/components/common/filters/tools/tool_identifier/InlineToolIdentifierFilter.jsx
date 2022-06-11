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
    valueField,
  }) {
  const validateAndSetData = (fieldName, selectedOption) => {
    let newDataObject = filterModel;
    newDataObject.setData("toolIdentifierName", selectedOption?.name);
    newDataObject.setData(fieldName, selectedOption[valueField]);
    loadData(newDataObject);
  };

  return (
    <ToolIdentifierFilter
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


InlineToolIdentifierFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  valueField: PropTypes.string,
};

InlineToolIdentifierFilter.defaultProps = {
  fieldName: "toolIdentifier",
  valueField: "identifier",
};

export default InlineToolIdentifierFilter;


