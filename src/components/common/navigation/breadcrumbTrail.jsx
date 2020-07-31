import React from "react";
import PropTypes from "prop-types";
import {getTrail} from "./trails";
import BreadcrumbItem from "./breadcrumbItem";


function BreadcrumbTrail({destination}) {

  const getParentTrail = (trail) => {
    console.log("getParentTrail: " + JSON.stringify(trail))
    return trail.map((breadcrumb) => <BreadcrumbItem breadcrumb={breadcrumb}/>);
  }

  const getBreadcrumbTrail = (destination) => {
    let breadcrumbTrail = getTrail(destination);
    return (
      <ol className="breadcrumb-list">
        {breadcrumbTrail.trail && getParentTrail(breadcrumbTrail.trail)}
        <li className="breadcrumb-item active">{breadcrumbTrail.destination.label}</li>
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


