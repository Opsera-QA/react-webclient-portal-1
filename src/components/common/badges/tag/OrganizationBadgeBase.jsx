import React from "react";
import PropTypes from "prop-types";
import { faSitemap } from "@fortawesome/pro-light-svg-icons";
import { hasStringValue } from "components/common/helpers/string-helpers";
import BadgeBase from "components/common/badges/BadgeBase";

function OrganizationBadgeBase({ badgeText, className }) {
  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return <BadgeBase className={`${className} tag-badge`} icon={faSitemap} badgeText={badgeText} />;
}

OrganizationBadgeBase.propTypes = {
  badgeText: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(OrganizationBadgeBase);
