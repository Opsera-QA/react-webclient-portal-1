import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import UserBadge from "components/common/badges/user/UserBadge";
import GroupBadge from "components/common/badges/group/GroupBadge";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import {ACCESS_ROLE_TYPES} from "components/common/inputs/roles/StandaloneRoleAccessTypeInput";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RoleDisplayer from "components/common/fields/multiple_items/roles/displayer/RoleDisplayer";

function AccessRoleDisplayer({roles, className, noDataMessage}) {
  const [administrators, setAdministrators] = useState([]);
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
      unpackRoles();
  }, [JSON.stringify(roles)]);

  const unpackRoles = () => {
    const newAdministrators = [];
    const newManagers = [];
    const newUsers = [];
    const newGuests = [];

    if (Array.isArray(roles) && roles.length > 0) {
      roles.forEach((accessRole) => {
        const role = accessRole?.role;

        switch (role) {
          case ACCESS_ROLE_TYPES.ADMINISTRATOR:
            newAdministrators.push(accessRole);
            break;
          case ACCESS_ROLE_TYPES.MANAGER:
            newManagers.push(accessRole);
            break;
          case ACCESS_ROLE_TYPES.USER:
            newUsers.push(accessRole);
            break;
          case ACCESS_ROLE_TYPES.GUEST:
            newGuests.push(accessRole);
            break;
        }
      });
    }

    setAdministrators(newAdministrators);
    setManagers(newManagers);
    setUsers(newUsers);
    setGuests(newGuests);
  };

  const getRoleAccessPopover = () => {
    return (
      <div>
        <RoleDisplayer
          className={"mb-3"}
          accessRoles={administrators}
          type={"Administrator"}
        />
        <RoleDisplayer
          className={"mb-3"}
          accessRoles={managers}
          type={"Manager"}
        />
        <RoleDisplayer
          className={"mb-3"}
          accessRoles={users}
          type={"User"}
        />
        <RoleDisplayer
          className={"mb-3"}
          accessRoles={guests}
          type={"Guest"}
        />
      </div>
    );
  };

  if (!Array.isArray(roles) || roles?.length === 0) {
    return (noDataMessage);
  }

  return (
    <TooltipWrapper
      innerText={getRoleAccessPopover()}
      title={"Access Roles"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <span className={className}>
        <span className="item-field">
          <SpyglassBadge
            badgeText={`${roles.length} Access Role${roles.length !== 1 ? "s" : ""} Applied`}
          />
        </span>
      </span>
    </TooltipWrapper>
  );
}

AccessRoleDisplayer.propTypes = {
  roles: PropTypes.array,
  className: PropTypes.string,
  noDataMessage: PropTypes.any,
};

export default AccessRoleDisplayer;