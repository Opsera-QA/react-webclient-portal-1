import React, {useState} from "react";
import PropTypes from "prop-types";
import {createFilterOptions} from "../../filters/filterHelpers";
import DropdownList from "react-widgets/lib/DropdownList";

function PageSort({ paginationDto, setPaginationDto, loadData}) {
  // const [field] = useState(dataObject.getFieldById(fieldName));

  const updateSortOption = (sortOption) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("sortOption", sortOption);
    setPaginationDto({...paginationDto});
    loadData();
  };

  return (
    <div className="">
      {/*<label><span>{field.label}</span></label>*/}
      <DropdownList
        data={createFilterOptions(paginationDto.getMetaData()["sortOptions"], "Sort", "text", "option")}
        valueField={"value"}
        textField={"text"}
        // filter={filter}
        value={paginationDto.getData("sortOption")}
        placeholder={"Sort Page"}
        onChange={sortOption => updateSortOption(sortOption["value"])}
      />
    </div>
  );
}

PageSort.propTypes = {
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func
};

export default PageSort;


