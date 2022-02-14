import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import {accessRuleTypeConstants} from "components/common/inputs/access_rules/constants/AccessRuleType.constants";
import AccessRuleBadgeDisplayer from "components/common/inputs/access_rules/field/AccessRuleBadgeDisplayer";

function AccessRuleField({rules, className, noDataMessage}) {
  const [ssoUserOrganizations, setSsoUserOrganizations] = useState([]);

  useEffect(() => {
      unpackRoles();
  }, [JSON.stringify(rules)]);

  const unpackRoles = () => {
    const ssoUserOrganizations = [];

    if (Array.isArray(rules) && rules.length > 0) {
      rules.forEach((accessRule) => {
        const type = accessRule?.type;

        switch (type) {
          case accessRuleTypeConstants.ACCESS_RULE_TYPES.SSO_USER_ORGANIZATION:
            ssoUserOrganizations.push(accessRule);
            break;
        }
      });
    }

    setSsoUserOrganizations([...ssoUserOrganizations]);
  };

  const getRoleAccessPopover = () => {
    return (
      <div>
        <AccessRuleBadgeDisplayer
          className={"mb-3"}
          accessRules={ssoUserOrganizations}
          type={accessRuleTypeConstants.ACCESS_RULE_TYPE_LABELS.SSO_USER_ORGANIZATION}
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

AccessRuleField.propTypes = {
  rules: PropTypes.array,
  className: PropTypes.string,
  noDataMessage: PropTypes.any,
};

AccessRuleField.defaultProps = {
  noDataMessage: "No Access Rules are Applied",
};

export default AccessRuleField;