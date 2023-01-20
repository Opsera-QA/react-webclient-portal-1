import React from "react";
import PropTypes from "prop-types";
import UserBadge from "components/common/badges/user/UserBadge";
import GroupBadge from "components/common/badges/group/GroupBadge";
import SiteRoleBadge from "components/common/badges/site_role/SiteRoleBadge";

function RoleDisplayer({accessRoles, type, className}) {
  const getRoleBadges = () => {
    if (!Array.isArray(accessRoles) || accessRoles.length === 0) {
      return (
        <span>No {type} Roles Assigned</span>
      );
    }

    return (
      accessRoles.map((accessRole, i) => {
        const user = accessRole?.user;
        const group = accessRole?.group;
        const siteRole = accessRole?.site_role;

        if (user) {
          return (
            <UserBadge
              badgeText={`${user}`}
              className={"mr-1 mb-1"}
              key={i}
            />
          );
        }

        if (siteRole) {
          return (
            <SiteRoleBadge
              siteRole={siteRole}
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
      <div className={"text-muted mb-1"}>
        {`${type}s`}
      </div>
      <span className="accessRole-field role-access">
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