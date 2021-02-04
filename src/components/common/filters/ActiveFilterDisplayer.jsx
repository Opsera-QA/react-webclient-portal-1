import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

function ActiveFilterDisplayer({filterDto, setFilterDto, loadData}) {
  const getFilterActiveButton = (filter, key) => {
    return (
      <Button type="outline-primary" size="sm" className="mx-2" key={key}>
        <span className="">{filter["text"]}</span>
        <span className="ml-1" onClick={() => {removeFilter(filter.filterId);}}>
              <FontAwesomeIcon icon={faTimes} fixedWidth/>
        </span>
      </Button>
    );
  };

  const removeFilter = (fieldName) => {
    let newDto = filterDto;
    newDto.setData(fieldName, filterDto.getDefaultValue(fieldName));
    newDto.setData("currentPage", 1);
    setFilterDto({...newDto});
    loadData(newDto);
  };

  if (filterDto == null) {
    return <></>;
  }

  return (
    <div className="custom-item-input justify-content-between">
      {filterDto.getData("activeFilters").map((filter, key) =>  getFilterActiveButton(filter, key))}
    </div>
  );
}

ActiveFilterDisplayer.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  loadData: PropTypes.func,
};

export default ActiveFilterDisplayer;