import React from "react";
import PropTypes from "prop-types";
import GroupBadge from "components/common/badges/group/GroupBadge";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import {accessRuleTypeConstants} from "components/common/inputs/access_rules/constants/AccessRuleType.constants";

function AllowedSsoUserOrganizationNamesBadgeDisplayer({allowedSsoOrganizationNames, type, className}) {
  const getRuleBadges = () => {
    if (!Array.isArray(allowedSsoOrganizationNames) || allowedSsoOrganizationNames?.length === 0) {
      return (
        <span>No {accessRuleTypeConstants.ACCESS_RULE_TYPE_LABELS.ALLOWED_SSO_USER_ORGANIZATIONS} rule assigned. All organizations can see this {type}</span>
      );
    }

    return (
      allowedSsoOrganizationNames.map((organizationName, i) => {
        return (
          <GroupBadge
            badgeText={`${organizationName}`}
            className={"mr-1 mb-1"}
            key={i}
          />
        );
      })
    );
  };

  return (
    <div className={className}>
      <H5FieldSubHeader subheaderText={`${accessRuleTypeConstants.ACCESS_RULE_TYPE_LABELS.ALLOWED_SSO_USER_ORGANIZATIONS}`}/>
      <span className="item-field role-access">
        {getRuleBadges()}
      </span>
    </div>
  );
}

AllowedSsoUserOrganizationNamesBadgeDisplayer.propTypes = {
  allowedSsoOrganizationNames: PropTypes.array,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default AllowedSsoUserOrganizationNamesBadgeDisplayer;