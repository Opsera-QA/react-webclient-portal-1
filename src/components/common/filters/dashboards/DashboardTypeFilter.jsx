import React from "react";
import PropTypes from "prop-types";
import DtoFilterSelectInput from "../input/DtoFilterSelectInput";

function DashboardTypeFilter({ filterDto, setFilterDto}) {
  const typeOptions = [{text: "Pipeline", value: "pipeline"}, {text: "Planning", value: "planning"}, {text: "Security", value: "security"}, {text: "Quality", value: "quality"}, {text: "Operations", value: "operations"} ];
  return (
    <div><DtoFilterSelectInput fieldName={"type"} placeholderText={"Filter by Dashboard Type"} setDataObject={setFilterDto} dataObject={filterDto} selectOptions={typeOptions} /></div>
  );
}


DashboardTypeFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
};

export default DashboardTypeFilter;


