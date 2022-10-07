import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";

function AccessRoleDisplayerField({roles, className, noDataMessage}) {
  if (!Array.isArray(roles) || roles?.length === 0) {
    return (noDataMessage);
  }

  return (
    <TooltipWrapper
      innerText={<AccessRoleDisplayer roles={roles} />}
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

AccessRoleDisplayerField.propTypes = {
  roles: PropTypes.array,
  className: PropTypes.string,
  noDataMessage: PropTypes.any,
};

export default AccessRoleDisplayerField;