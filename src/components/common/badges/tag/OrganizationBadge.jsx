import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetter, truncateString } from "components/common/helpers/string-helpers";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";
import OrganizationBadgeBase from "components/common/badges/tag/OrganizationBadgeBase";

function OrganizationBadge({ tag, className }) {
  return <OrganizationBadgeBase className={className} badgeText={`${capitalizeFirstLetter(tag?.name)}`} />;
}

OrganizationBadge.propTypes = {
  tag: PropTypes.object,
  className: PropTypes.string,
};

export default React.memo(OrganizationBadge);
