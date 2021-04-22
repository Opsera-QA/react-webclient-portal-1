import React from "react";
import PropTypes from "prop-types";
import BooleanFilter from "components/common/filters/boolean/BooleanFilter";

function InlineBooleanFilter({ fieldName, loadData, filterDto, setFilterDto, inline, toolTipText}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value);
    loadData(newDataObject);
  };

  return (
    <BooleanFilter
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      setFilterDto={setFilterDto}
      inline={inline}
      filterDto={filterDto}
      toolTipText={toolTipText}
    />
  );
}

InlineBooleanFilter.propTypes = {
  fieldName: PropTypes.string,
  filterDto: PropTypes.object,
  loadData: PropTypes.func,
  setFilterDto: PropTypes.func,
  inline: PropTypes.bool,
  toolTipText: PropTypes.bool
};

export default InlineBooleanFilter;