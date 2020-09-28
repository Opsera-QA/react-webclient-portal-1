import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/pro-solid-svg-icons";
import {faTimes} from "@fortawesome/pro-regular-svg-icons";
import Model from "../../../core/data_model/model";

function FilterBar({ filterDto, children, loadData}) {
  const resetFilters = async () => {
    let newFilterDto = new Model({...filterDto.getNewObjectFields()}, filterDto.getMetaData(), false);
    let pageSize = filterDto.getData("pageSize");
    newFilterDto.setData("pageSize", pageSize);
    // TODO: Do we want to keep sort option?
    // let sortOption = filterDto.getData("sortOption");
    // newFilterDto.setData("sortOption", sortOption);
    await loadData(newFilterDto);
  };

  return (
    <div className="d-flex flex-row-reverse filter-bar">
      <div><Button className={"ml-2"} type="primary" size="sm" onClick={() => resetFilters()}><span><FontAwesomeIcon icon={faTimes}/></span></Button></div>
      <div><Button type="primary" size="sm" onClick={() => loadData()}><span><FontAwesomeIcon icon={faFilter}/></span></Button></div>
      {children}
    </div>
  );
}


FilterBar.propTypes = {
  filterDto: PropTypes.object,
  children: PropTypes.any,
  loadData: PropTypes.func
};

export default FilterBar;


