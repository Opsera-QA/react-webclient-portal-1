import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import {accessRuleTypeConstants} from "components/common/inputs/access_rules/constants/AccessRuleType.constants";
import AllowedSsoUserOrganizationNamesBadgeDisplayer
  from "components/common/inputs/access_rules/field/AllowedSsoUserOrganizationNamesBadgeDisplayer";

function AccessRuleOverlayField({rules, className, noDataMessage}) {
  const [ssoUserOrganizations, setSsoUserOrganizations] = useState([]);

  useEffect(() => {
      unpackRoles();
  }, [JSON.stringify(rules)]);

  const unpackRoles = () => {

    if (Array.isArray(rules) && rules.length > 0) {
      rules.forEach((accessRule) => {
        const type = accessRule?.type;

        switch (type) {
          case accessRuleTypeConstants.ACCESS_RULE_TYPES.ALLOWED_SSO_USER_ORGANIZATIONS:
            unpackAllowedSsoUserOrganizationNames(accessRule?.value);
            break;
        }
      });
    }
  };

  const unpackAllowedSsoUserOrganizationNames = (ssoUserOrganizationNameArray) => {
    if (!Array.isArray(ssoUserOrganizationNameArray) || ssoUserOrganizationNameArray?.length === 0) {
      setSsoUserOrganizations([]);
    }

    setSsoUserOrganizations([...ssoUserOrganizationNameArray]);
  };

  const getRoleAccessPopover = () => {
    return (
      <div>
        <AllowedSsoUserOrganizationNamesBadgeDisplayer
          className={"mb-3"}
          allowedSsoOrganizationNames={ssoUserOrganizations}
          type={"Kpi"}
        />
      </div>
    );
  };

  if (!Array.isArray(rules) || rules?.length === 0) {
    return (noDataMessage);
  }

  return (
    <TooltipWrapper
      innerText={getRoleAccessPopover()}
      title={"Access Rules"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <span className={className}>
        <span className="item-field">
          <SpyglassBadge
            badgeText={`${rules?.length} Access Rule${rules?.length !== 1 ? "s" : ""} Applied`}
          />
        </span>
      </span>
    </TooltipWrapper>
  );
}

AccessRuleOverlayField.propTypes = {
  rules: PropTypes.array,
  className: PropTypes.string,
  noDataMessage: PropTypes.any,
};

AccessRuleOverlayField.defaultProps = {
  noDataMessage: "No Access Rules are Applied",
};

export default AccessRuleOverlayField;