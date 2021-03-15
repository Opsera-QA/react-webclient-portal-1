import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";

function FilterTitleBar({ title, inlineFilters, titleIcon, isLoading }) {
  // TODO: Make component
  const getTitleIcon = () => {
    if (isLoading) {
      return <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>;
    }

    return <FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>;
  };

  return (
    <div className="d-flex w-100 justify-content-between">
      <div className="d-none d-lg-block my-auto mr-2 filter-title-text text-nowrap">{getTitleIcon()}{title}</div>
      <div className="d-flex">
        <div className="my-1">{inlineFilters}</div>
      </div>
    </div>
  );
}

FilterTitleBar.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  inlineFilters: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default FilterTitleBar;