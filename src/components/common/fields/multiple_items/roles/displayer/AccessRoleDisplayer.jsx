import React from "react";
import PropTypes from "prop-types";
import {ACCESS_ROLE_TYPES} from "components/common/inputs/roles/StandaloneRoleAccessTypeInput";
import RoleDisplayer from "components/common/fields/multiple_items/roles/displayer/RoleDisplayer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

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

  const getTitle = () => {
    return (
      <H5FieldSubHeader
        subheaderText={"Assigned Roles"}
        className={"mb-3"}
      />
    );
  };

  if (!Array.isArray(roles) || roles?.length === 0) {
    return (noDataMessage);
  }

  return (
    <div className={className}>
      {getTitle()}
      <RoleDisplayer
        className={"mb-2"}
        accessRoles={administrators}
        type={"Administrator"}
      />
      <RoleDisplayer
        className={"mb-2"}
        accessRoles={managers}
        type={"Manager"}
      />
      <RoleDisplayer
        className={"mb-2"}
        accessRoles={users}
        type={"User"}
      />
      <RoleDisplayer
        className={"mb-2"}
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