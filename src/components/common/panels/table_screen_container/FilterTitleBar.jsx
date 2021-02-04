import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function FilterTitleBar({ title, tableFilters, titleIcon, isLoading }) {
  /*if (isLoading) {
    return (<div className="pt-2"><h5><span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span></h5></div>);
  }*/

  return (
    <div className="d-flex justify-content-between w-100">
      <div className="title-text-header-2 pt-1">
        {isLoading ?
          <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>
          :
          <FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>
        }
        {title}</div>
      <div className="d-flex small">{tableFilters}</div>
    </div>
  );
}


FilterTitleBar.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  tableFilters: PropTypes.any,
  isLoading: PropTypes.bool
};

export default FilterTitleBar;