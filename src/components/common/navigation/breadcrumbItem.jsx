import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

function BreadcrumbItem({breadcrumb}) {
  return (
      <li className="breadcrumb-item">
        <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
      </li>
  );
}

BreadcrumbItem.propTypes = {
  breadcrumb: PropTypes.object,
};

export default BreadcrumbItem;
