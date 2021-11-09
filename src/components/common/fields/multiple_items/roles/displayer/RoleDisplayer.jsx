import React from "react";
import PropTypes from "prop-types";
import UserBadge from "components/common/badges/user/UserBadge";
import GroupBadge from "components/common/badges/group/GroupBadge";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

function RoleDisplayer({accessRoles, type, className}) {
  const getRoleBadges = () => {
    if (!Array.isArray(accessRoles) || accessRoles.length === 0) {
      return (
        <span>No {type} Roles Assigned</span>
      );
    }

    return (
      accessRoles.map((item, i) => {
        const user = item["user"];
        const group = item["group"];

        if (user) {
          return (
            <UserBadge
              badgeText={`${user}`}
              className={"mr-1 mb-1"}
              key={i}
            />
          );
        }

        return (
          <GroupBadge
            badgeText={`${group}`}
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
        {getRoleBadges()}
      </span>
    </div>
  );
}

RoleDisplayer.propTypes = {
  accessRoles: PropTypes.array,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default RoleDisplayer;