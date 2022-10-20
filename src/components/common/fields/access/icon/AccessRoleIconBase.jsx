import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import { faLock, faUnlock } from "@fortawesome/pro-light-svg-icons";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";

export default function AccessRoleIconBase(
  {
    owner,
    roles,
    type,
    className,
    tooltipPlacement,
    iconSize,
  }) {
  const parseRoles = DataParsingHelper.parseArray(roles, []);
  const parsedOwner = DataParsingHelper.parseMongoDbId(owner);

  if (!Array.isArray(parseRoles) || parseRoles.length === 0 || isMongoDbId(parsedOwner) === false) {
    return (
      <div className={className}>
        <TooltipWrapper
          innerText={`This ${type} is public and accessible to everyone.`}
          wrapInDiv={true}
          placement={tooltipPlacement}
        >
          <IconBase
            icon={faUnlock}
            className={"danger-red ml-2"}
            iconSize={iconSize}
          />
        </TooltipWrapper>
      </div>
    );
  }

  const rolesPopover = (
    <div>
      <div className={"mb-3"}>
        {`This ${type} is secured and only visible to Site Administrators, its owner, and those given access`}
      </div>
      <AccessRoleDisplayer
        roles={parseRoles}
      />
    </div>
  );

  return (
    <div className={className}>
      <TooltipWrapper
        title={`Secured ${type} Details`}
        innerText={rolesPopover}
        wrapInDiv={true}
        placement={tooltipPlacement}
      >
        <IconBase
          icon={faLock}
          className={"ml-2"}
          iconSize={iconSize}
        />
      </TooltipWrapper>
    </div>
  );
}

AccessRoleIconBase.propTypes = {
  owner: PropTypes.string,
  roles: PropTypes.array,
  type: PropTypes.string,
  className: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  iconSize: PropTypes.string,
};

AccessRoleIconBase.defaultProps = {
  tooltipPlacement: "bottom",
};