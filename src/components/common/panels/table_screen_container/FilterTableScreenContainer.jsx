import React from "react";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import PropTypes from "prop-types";

function FilterTableScreenContainer({ breadcrumbDestination, title, tableComponent }) {

  return (
    <div className="max-content-width mb-2 ml-2">
      <BreadcrumbTrail destination={breadcrumbDestination} />
      <div className="justify-content-between mb-1 d-flex">
        <h5><span>{title}</span></h5>
      </div>
      <div className="full-height content-block-shaded p-2">
        {tableComponent}
      </div>
    </div>
  );
}


FilterTableScreenContainer.propTypes = {
  breadcrumbDestination: PropTypes.string,
  title: PropTypes.string,
  tableComponent: PropTypes.object,
};

export default FilterTableScreenContainer;