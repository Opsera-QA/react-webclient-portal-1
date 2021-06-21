import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";

function ActiveFilterDisplayer({filterDto, setFilterDto, loadData}) {
  const getFilterActiveButton = (filter, key) => {
    return (
      <span key={key} className="mx-1 badge badge-light filter-badge">
        <span className="mr-1"><FontAwesomeIcon icon={faFilter} fixedWidth/></span>
        <span>{filter["text"]}</span>
        <span className="ml-1 pointer" onClick={() => {removeFilter(filter.filterId);}}>
          <FontAwesomeIcon icon={faTimes} fixedWidth/>
        </span>
      </span>
    );
  };

  const removeFilter = (fieldName) => {
    let newDto = filterDto;
    newDto.setData(fieldName, filterDto.getDefaultValue(fieldName));
    newDto.setData("currentPage", 1);

    // TODO: Setting state on filter model should only be handled in the load data function and this should be removed.
    //  Leaving here for now to prevent unintended side effects
    if (setFilterDto) {
      setFilterDto({...newDto});
    }

    loadData(newDto);
  };

  const getActiveFilters = () => {
    const activeFilters = filterDto?.getData("activeFilters");
    if (Array.isArray(activeFilters) && activeFilters.length > 0) {
      return (
        <div className="active-filter-bar item-field py-2 px-1">
          {activeFilters.map((filter, key) =>  getFilterActiveButton(filter, key))}
        </div>
      );
    }

    return null;
  };

  if (filterDto == null) {
    return null;
  }

  return (getActiveFilters());
}

ActiveFilterDisplayer.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  loadData: PropTypes.func,
};

export default ActiveFilterDisplayer;