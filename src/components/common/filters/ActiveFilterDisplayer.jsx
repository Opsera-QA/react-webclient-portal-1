import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {faFilter} from "@fortawesome/pro-solid-svg-icons";

function ActiveFilterDisplayer({filterDto, setFilterDto, loadData, filters}) {
  const isFilterActive = (fieldName) => {
    let filter = filterDto.getData(fieldName);
    return filter != null && filter !== "";
  };

  const getFilterActiveButton = (fieldName, key) => {
    return isFilterActive(fieldName)
      ? <Button type="primary" size="sm" className="mx-2" key={key}>
          <span><FontAwesomeIcon icon={faFilter} fixedWidth className="mr-2"/>{filterDto.getLabel(fieldName)}:</span>
          <span className="mx-2">{filterDto.getData(fieldName)}</span>
          <span className="ml-2" onClick={() => {removeFilter(fieldName);}}>
            <FontAwesomeIcon icon={faTimes} fixedWidth/>
          </span>
        </Button>
      : null;
  };

  const removeFilter = (fieldName) => {
    let newDto = filterDto;
    newDto.setData(fieldName, null);
    setFilterDto({...newDto});
    loadData(newDto);
  };

  if (filterDto == null) {
    return <></>;
  }

  return (
    <div className="custom-item-input justify-content-between">
      {filters.map((filterName, key) =>  getFilterActiveButton(filterName, key))}
    </div>
  );
}

ActiveFilterDisplayer.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  filters: PropTypes.array
};

export default ActiveFilterDisplayer;