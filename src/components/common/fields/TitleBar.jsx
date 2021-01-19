import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

// TODO: Move and rename
function TitleBar({ title, titleIcon, isLoading, inactive }) {

  if (isLoading) {
    return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span>);
  }

  return (
    <div className="d-flex">
      <div><span><FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>{title}</span></div>
      <div className="ml-auto mr-3"><span className="text-white-50">{inactive && "Inactive"}</span></div>
    </div>);
}


TitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default TitleBar;