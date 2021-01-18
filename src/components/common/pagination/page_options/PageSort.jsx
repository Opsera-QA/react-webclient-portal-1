import React from "react";
import PropTypes from "prop-types";
import {createPageSortOptions} from "../../filters/filterHelpers";
import DropdownList from "react-widgets/lib/DropdownList";

function PageSort({ paginationDto, setPaginationDto, loadData, isLoading}) {
  // const [field] = useState(dataObject.getFieldById(fieldName));

  const updateSortOption = (sortOption) => {
    paginationDto.setData("currentPage", 1);
    paginationDto.setData("sortOption", sortOption);
    setPaginationDto({...paginationDto});
    loadData(paginationDto);
  };

  if (paginationDto.getMetaData()["sortOptions"] == null) {
   return <></>;
  }

  return (
    <div className="">
      {/*<label><span>{field.label}</span></label>*/}
      <DropdownList
        data={createPageSortOptions(paginationDto.getMetaData()["sortOptions"], "Sort", "text")}
        valueField={"key"}
        textField={"text"}
        busy={isLoading}
        // filter={filter}
        value={paginationDto.getData("sortOption")}
        placeholder={"Sort Page"}
        onChange={sortOption => updateSortOption(sortOption)}
      />
    </div>
  );
}

PageSort.propTypes = {
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default PageSort;


