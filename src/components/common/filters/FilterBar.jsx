import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/pro-solid-svg-icons";
import {faTimes} from "@fortawesome/pro-regular-svg-icons";

function FilterBar({ resetFilters, children, loadData}) {
  return (
    <div className="d-flex flex-row-reverse filter-bar">
      <div><Button className={"ml-2"} type="primary" size="sm" onClick={() => resetFilters()}><span><FontAwesomeIcon icon={faTimes}/></span></Button></div>
      <div><Button type="primary" size="sm" onClick={() => loadData()}><span><FontAwesomeIcon icon={faFilter}/></span></Button></div>
      {children}
    </div>
  );
}


FilterBar.propTypes = {
  resetFilters: PropTypes.func,
  children: PropTypes.any,
  loadData: PropTypes.func
};

export default FilterBar;


