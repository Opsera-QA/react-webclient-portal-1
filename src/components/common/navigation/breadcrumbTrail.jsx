import React from "react";
import PropTypes from "prop-types";
import {getTrail} from "./trails";
import {breadcrumbItem} from "./breadcrumbItem";

function BreadcrumbTrail({destination}) {

  const getParentTrail = (trail) => {
    return trail.map((breadcrumb) => breadcrumbItem(breadcrumb));
  };

  const getBreadcrumbTrail = (destination) => {
    let breadcrumbTrail = getTrail(destination);

    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbTrail.trail && getParentTrail(breadcrumbTrail.trail)}
          <li className="breadcrumb-item">{breadcrumbTrail.breadcrumb.title}</li>
        </ol>
      </nav>
    );
  };

  return (<>{getBreadcrumbTrail(destination)}</>);
}

BreadcrumbTrail.propTypes = {
  destination: PropTypes.string,
};

export default BreadcrumbTrail;


