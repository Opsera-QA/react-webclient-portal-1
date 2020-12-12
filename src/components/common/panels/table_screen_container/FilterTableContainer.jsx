import React from "react";
import PropTypes from "prop-types";

function FilterTableContainer({title, titleIcon, tableFilters, isLoading, tableComponent }) {

  return (
    <div className="max-content-width mb-2 ml-2">
      <div className="full-height content-block-shaded p-2">
        {tableComponent}
      </div>
    </div>
  );
}

FilterTableContainer.propTypes = {
  isLoading: PropTypes.bool,
  titleIcon: PropTypes.object,
  tableFilters: PropTypes.any,
  title: PropTypes.string,
  tableComponent: PropTypes.object,
};

export default FilterTableContainer;