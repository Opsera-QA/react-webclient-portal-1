import React, {useState} from "react";
import PropTypes from "prop-types";
import {getBreadcrumb} from "components/common/navigation/trails";
import PageLinkCard from "components/common/card/link/PageLinkCard";

function BreadcrumbPageLinkCard({ breadcrumbDestination, visible }) {
  const [breadcrumb] = useState(getBreadcrumb(breadcrumbDestination));

  if (!breadcrumb) {
    console.error(`Could not find breadcrumb for destination [${breadcrumbDestination}]`);
    return null;
  }

  return (
    <PageLinkCard
      linkText={breadcrumb?.linkText}
      icon={breadcrumb?.icon}
      link={"/" + breadcrumb?.path}
      visible={visible}
      pageDescription={breadcrumb?.pageDescription}
    />
  );
}

BreadcrumbPageLinkCard.propTypes = {
  breadcrumbDestination: PropTypes.string.isRequired,
  visible: PropTypes.bool
};

export default BreadcrumbPageLinkCard;