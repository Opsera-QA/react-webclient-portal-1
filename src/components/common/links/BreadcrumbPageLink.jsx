import React, {useState} from "react";
import PropTypes from "prop-types";
import PageLink from "./PageLink";
import {getBreadcrumb} from "../navigation/trails";

function BreadcrumbPageLink({ breadcrumbDestination }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));

  return (<PageLink linkText={breadcrumb.label} icon={breadcrumb.icon} link={"/" + breadcrumb.path} />);
}

BreadcrumbPageLink.propTypes = {
  breadcrumbDestination: PropTypes.string.isRequired,
};

export default BreadcrumbPageLink;