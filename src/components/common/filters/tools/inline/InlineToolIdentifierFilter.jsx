import React from "react";
import PropTypes from "prop-types";
import ToolIdentifierFilter from "components/common/filters/tools/ToolIdentifierFilter";

function InlineToolIdentifierFilter({ filterModel, setFilterModel, fieldName, className, loadData }) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <ToolIdentifierFilter
      className={className}
      filterDto={filterModel}
      setFilterDto={setFilterModel}
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
};

InlineToolIdentifierFilter.defaultProps = {
  fieldName: "toolIdentifier"
};

export default InlineToolIdentifierFilter;


