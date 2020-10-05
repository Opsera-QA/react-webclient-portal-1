import React from "react";
import PropTypes from "prop-types";
import DtoFilterSelectInput from "../input/DtoFilterSelectInput";

function StatusFilter({ filterDto, setFilterDto}) {
  const statusOptions = [{text: "Status: All", value: undefined}, {text: "Status: Active", value: "active"}, {text: "Status: Inactive", value: "inactive"} ];

  return (
    <div><DtoFilterSelectInput fieldName={"status"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={statusOptions} /></div>
  );
}


StatusFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default StatusFilter;


