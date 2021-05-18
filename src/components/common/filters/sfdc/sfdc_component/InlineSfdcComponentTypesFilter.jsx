import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function InlineSfdcComponentTypesFilter({ componentTypes, filterDto, setFilterDto, className, inline}) {
  const setData = (fieldName, value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value.value);    
    setFilterDto({...newDataObject});
  };

  if (filterDto == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      inline={inline}
      fieldName={"classFilter"}
      placeholderText={"Filter By Component"}
      setDataObject={setFilterDto}
      dataObject={filterDto}
      selectOptions={componentTypes}
      setDataFunction={setData}
    />
  );
}

InlineSfdcComponentTypesFilter.propTypes = {
  componentTypes: PropTypes.arrayOf(PropTypes.object),
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string,
  inline: PropTypes.bool
};

export default InlineSfdcComponentTypesFilter;


