import React from "react";
import PropTypes from "prop-types";
import {faSearch, faTag} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import RestrictedAccessBadge from "components/common/badges/access/RestrictedAccessBadge";
import UnrestrictedAccessBadge from "components/common/badges/access/UnrestrictedAccessBadge";

function AccessRoleDisplayer({roles, className, showNorolesAppliedBadge}) {
  const getTagPopover = () => {
    if (Array.isArray(roles) && roles.length > 0) {
      return (
        <CustomBadgeContainer>
          {roles.map((tag, index) => {
            if (typeof tag !== "string") {
              return (
                // <div>
                  <CustomBadge
                    badgeText={
                      <span>
                        <span className="mr-1">
                          {capitalizeFirstLetter(tag.type)}:
                        </span>
                        {capitalizeFirstLetter(tag.value)}
                      </span>
                    }
                    icon={faTag}
                    key={index}
                  />
                // </div>
              );
            }
          })}
        </CustomBadgeContainer>
      );
    }
  };

  if (!Array.isArray(roles) || roles.length === 0) {
    if (showNorolesAppliedBadge === true) {
      return (
        <div className={className}>
          <UnrestrictedAccessBadge
            badgeText={"No Access Roles Applied"}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <TooltipWrapper
      innerText={getTagPopover()}
      title={"Access Roles"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <div className={className}>
        <span className="item-field">
          <RestrictedAccessBadge
            badgeText={`${roles.length} Access Role${roles.length !== 1 ? "s" : ""} Applied`}
          />
          <span>
            <span className="mr-1 badge badge-light group-badge">
              <IconBase icon={faSearch} className={"mr-1"}/>
              {roles.length} Tag{roles.length !== 1 ? "s" : ""} Applied
            </span>
          </span>
        </span>
      </div>
    </TooltipWrapper>
  );
}

AccessRoleDisplayer.propTypes = {
  roles: PropTypes.array,
  className: PropTypes.string,
  showNorolesAppliedBadge: PropTypes.bool,
};

export default AccessRoleDisplayer;