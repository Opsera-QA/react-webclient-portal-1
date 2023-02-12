import React  from "react";
import PropTypes from "prop-types";
import {faServer} from "@fortawesome/pro-light-svg-icons";
import BadgeBase from "components/common/badges/BadgeBase";
import siteRoleConstants from "@opsera/know-your-role/constants/siteRole.constants";

export default function SiteRoleBadge({siteRole, className}) {
  if (siteRoleConstants.isSiteRoleValid(siteRole) !== true) {
    return null;
  }

  return (
    <BadgeBase
      className={`${className} badge-light user-badge`}
      badgeText={siteRoleConstants.getSiteRoleLabel(siteRole)}
      icon={faServer}
    />
  );
}

SiteRoleBadge.propTypes = {
  siteRole: PropTypes.any,
  className: PropTypes.string
};