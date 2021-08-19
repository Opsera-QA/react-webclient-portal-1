import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function InlineSfdcComponentTypesFilter({ componentTypes, fieldName, filterDto, setFilterDto, className, loadData}) {
  const setDataFunction = (fieldName, value) => {
    let newFilterDto = filterDto;
    newFilterDto.setData(fieldName, value);
    loadData({...newFilterDto});
  };

  if (filterDto == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      inline={true}
      fieldName={fieldName}
      placeholderText={"Filter By Component"}
      setDataObject={setFilterDto}
      dataObject={filterDto}
      selectOptions={componentTypes}
      setDataFunction={setDataFunction}
    />
  );
}

InlineSfdcComponentTypesFilter.propTypes = {
  componentTypes: PropTypes.arrayOf(PropTypes.object),
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  loadData: PropTypes.func,
};

InlineSfdcComponentTypesFilter.defaultProps = {
  fieldName: "componentFilter"
};

export default InlineSfdcComponentTypesFilter;


