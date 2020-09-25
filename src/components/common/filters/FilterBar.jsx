import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/pro-solid-svg-icons";
import Col from "react-bootstrap/Col";

function FilterBar({ children, loadData}) {
  // TODO: Add styling
  return (
    <div className="d-flex flex-row-reverse filter-bar">
      <div><Button type="primary" size="sm" onClick={() => loadData()}><span><FontAwesomeIcon icon={faFilter}/></span></Button></div>
      {children}
    </div>
  );
}


FilterBar.propTypes = {
  children: PropTypes.any,
  loadData: PropTypes.func
};

export default FilterBar;


