import React from "react";
import PropTypes from "prop-types";
import GroupBadge from "components/common/badges/group/GroupBadge";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

function AccessRuleBadgeDisplayer({accessRules, type, className}) {
  const getRuleBadges = () => {
    if (!Array.isArray(accessRules) || accessRules.length === 0) {
      return (
        <span>No {type} Roles Assigned</span>
      );
    }

    return (
      accessRules.map((item, i) => {
        return (
          <GroupBadge
            badgeText={`${item.value}`}
            className={"mr-1 mb-1"}
            key={i}
          />
        );
      })
    );
  };

  return (
    <div className={className}>
      <H5FieldSubHeader subheaderText={`${type}s`}/>
      <span className="item-field role-access">
        {getRuleBadges()}
      </span>
    </div>
  );
}

AccessRuleBadgeDisplayer.propTypes = {
  accessRules: PropTypes.array,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default AccessRuleBadgeDisplayer;