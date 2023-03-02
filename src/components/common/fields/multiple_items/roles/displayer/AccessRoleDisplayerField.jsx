import React from "react";
import PropTypes, {object} from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";
import IconBase from "components/common/icons/IconBase";
import {faLock} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function AccessRoleDisplayerField(
  {
    roles,
    className,
    noDataMessage,
    item,
    handleEditFunction,
  }) {
  const parsedRoles = DataParsingHelper.parseArray(roles, []);
  const {
    userData,
  } = useComponentStateReference();

  const getObjectAccessRoleText = () => {
    const accessRole = ObjectAccessRoleHelper.getUserAccessRole(userData, roles);

    if (accessRole && accessRole !== ObjectAccessRoleHelper.ACCESS_ROLES.NO_ROLES_ASSIGNED) {
      const accessRoleLabel = ObjectAccessRoleHelper.getLabelForAccessRole(accessRole);
      return `the ${accessRoleLabel} Access Role granted to you in addition to those granted to `;
    }

    return "";
  };

  const getAccessInformation = () => {
    const siteRole = SiteRoleHelper.getFormattedSiteRoleLevel(userData);
    const userAccessDetails = ObjectAccessRoleHelper.getUserAccessDetails(userData, item);
    const reason = DataParsingHelper.parseNestedString(userAccessDetails, "reason");

    if (parsedRoles.length === 0) {
      return `
       You have access to this to this item due to there being no Access Rules applied. 
       You have all of the permissions granted when there are no Access Rules in addition to those granted to your ${siteRole} Site Role.
      `;
    }

    if (reason === "ownership") {
      return `
       You have access to this to this item due to your ownership. 
       You have all of the permissions granted to Owners in addition to those granted to your ${siteRole} Site Role.
      `;
    }

    if (reason === "site_role") {
      return `
       You have access to this to this item due to your Site Role. 
       You have all of the permissions granted to ${getObjectAccessRoleText()}your ${siteRole} Site Role.
      `;
    }

    if (reason === "access_rule") {
      return `
       You have access to this to this item due to your Access Role. 
       You have all of the permissions granted to ${getObjectAccessRoleText()}your ${siteRole} Site Role.
      `;
    }
  };

  if (!Array.isArray(roles) || roles?.length === 0) {
    return noDataMessage;
  }

  return (
    <TooltipWrapper
      innerText={<AccessRoleDisplayer roles={roles} />}
      title={"Access Roles"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <span className={className}>
        <span>
          <IconBase
            className={"mr-1"}
            icon={faLock}
            onClickFunction={handleEditFunction}
          />
          {`${roles.length} Access Role${roles.length !== 1 ? "s" : ""} Applied. ${getAccessInformation()}`}
        </span>
      </span>
    </TooltipWrapper>
  );
}

AccessRoleDisplayerField.propTypes = {
  roles: PropTypes.array,
  className: PropTypes.string,
  noDataMessage: PropTypes.any,
  item: PropTypes.object,
  handleEditFunction: PropTypes.func,
};

AccessRoleDisplayerField.defaultProps = {
  noDataMessage: "No Access Roles Applied",
};