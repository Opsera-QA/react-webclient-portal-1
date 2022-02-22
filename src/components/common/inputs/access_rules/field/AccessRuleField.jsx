import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {accessRuleTypeConstants} from "components/common/inputs/access_rules/constants/AccessRuleType.constants";
import AllowedSsoUserOrganizationNamesBadgeDisplayer
  from "components/common/inputs/access_rules/field/AllowedSsoUserOrganizationNamesBadgeDisplayer";

function AccessRuleField({rules, className, noDataMessage}) {
  const [allowedSsoUserOrganizationNames, setAllowedSsoUserOrganizationNames] = useState([]);

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
      setAllowedSsoUserOrganizationNames([]);
    }

    setAllowedSsoUserOrganizationNames([...ssoUserOrganizationNameArray]);
  };

  if (!Array.isArray(rules) || rules?.length === 0) {
    return (noDataMessage);
  }

  return (
    <span className={className}>
      <span className="item-field">
        <AllowedSsoUserOrganizationNamesBadgeDisplayer
          className={"mb-3"}
          allowedSsoOrganizationNames={allowedSsoUserOrganizationNames}
          type={"KPI"}
        />
      </span>
    </span>
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