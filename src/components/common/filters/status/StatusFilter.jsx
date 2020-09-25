import React from "react";
import PropTypes from "prop-types";
import DtoFilterInput from "../../input/dto_input/dto-filter-input";

function StatusFilter({ filterDto, setFilterDto}) {
  const statusOptions = [{text: "All", value: undefined}, {text: "Active", value: "active"}, {text: "Inactive", value: "inactive"} ];

  return (
    <div><DtoFilterInput fieldName={"status"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={statusOptions} /></div>
  );
}


StatusFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default StatusFilter;


