import React from "react";
import PropTypes from "prop-types";
import {ACCESS_ROLE_TYPES} from "components/common/inputs/roles/StandaloneRoleAccessTypeInput";
import RoleDisplayer from "components/common/fields/multiple_items/roles/displayer/RoleDisplayer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function AccessRoleDisplayer(
  {
    roles,
    className,
    noDataMessage,
  }) {
  const parsedRoles = DataParsingHelper.parseArray(roles, []);
  const administrators = parsedRoles.filter((accessRole) => accessRole.role === ACCESS_ROLE_TYPES.ADMINISTRATOR);
  const managers = parsedRoles.filter((accessRole) => accessRole.role === ACCESS_ROLE_TYPES.MANAGER);
  const users = parsedRoles.filter((accessRole) => accessRole.role === ACCESS_ROLE_TYPES.USER);
  const guests = parsedRoles.filter((accessRole) => accessRole.role === ACCESS_ROLE_TYPES.GUEST);

  if (!Array.isArray(roles) || roles?.length === 0) {
    return (noDataMessage);
  }

  return (
    <div className={className}>
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
}

AccessRoleDisplayer.propTypes = {
  roles: PropTypes.array,
  className: PropTypes.string,
  noDataMessage: PropTypes.any,
};