import React, {useState} from "react";
import PropTypes from "prop-types";
import PageLink from "./PageLink";
import {getBreadcrumb} from "../navigation/trails";

function BreadcrumbPageLink({ breadcrumbDestination, visible }) {
  const [breadcrumb] = useState(getBreadcrumb(breadcrumbDestination));

  if (!breadcrumb) {
    console.error(`Could not find breadcrumb for destination [${breadcrumbDestination}]`);
    return null;
  }

  return (<PageLink linkText={breadcrumb?.linkText} icon={breadcrumb?.icon} link={"/" + breadcrumb?.path} visible={visible} />);
}

BreadcrumbPageLink.propTypes = {
  breadcrumbDestination: PropTypes.string.isRequired,
  visible: PropTypes.bool
};

export default BreadcrumbPageLink;