import React from "react";
import PropTypes from "prop-types";
import {getTrail} from "./trails";
import {breadcrumbItem} from "./breadcrumbItem";

function BreadcrumbTrail({destination}) {

  const getParentTrail = (trail) => {
    return trail.map((breadcrumb) => breadcrumbItem(breadcrumb));
  }

  const getBreadcrumbTrail = (destination) => {
    let breadcrumbTrail = getTrail(destination);
    return (
        <ol className="breadcrumb">
          {breadcrumbTrail.trail && getParentTrail(breadcrumbTrail.trail)}
          <li className="breadcrumb-item">{breadcrumbTrail.destination.label}</li>
        </ol>
    );
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        {getBreadcrumbTrail(destination)}
      </nav>
    </>
  );
}

BreadcrumbTrail.propTypes = {
  destination: PropTypes.string,
};

export default BreadcrumbTrail;


