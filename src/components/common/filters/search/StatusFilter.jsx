import React from "react";
import PropTypes from "prop-types";
import DtoFilterTextInput from "../../input/dto_input/filter/DtoFilterTextInput";

function SearchFilter({ filterDto, setFilterDto}) {
  return (
    <div><DtoFilterTextInput fieldName={"search"} setDataObject={setFilterDto} dataObject={filterDto} /></div>
  );
}

SearchFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default SearchFilter;


