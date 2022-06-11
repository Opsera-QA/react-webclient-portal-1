import React from "react";
import PropTypes from "prop-types";
import TagTypeFilter from "components/common/filters/tags/tag_type/TagTypeFilter";

function InlineTagTypeFilter({ fieldName, filterModel, setFilterModel, className, loadData}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = filterModel;
    newDataObject.setData(fieldName, selectedOption?.value);
    loadData(newDataObject);
  };

  return (
    <TagTypeFilter
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      fieldName={fieldName}
      className={className}
      setDataFunction={setDataFunction}
      inline={true}
    />
  );
}

InlineTagTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  loadData: PropTypes.func
};

export default InlineTagTypeFilter;


