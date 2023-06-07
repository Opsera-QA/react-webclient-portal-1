import React from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";
import useGetOrganizationSettingsEntitlementByName
  from "hooks/settings/organization_settings/entitlements/useGetOrganizationSettingsEntitlementByName";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function EntitlementRoute(
  {
    path,
    exact,
    component,
    entitlementName,
    childEntitlementName,
  }) {
  const {
    isActive,
    childEntitlements,
  } = useGetOrganizationSettingsEntitlementByName(entitlementName);

  if (
    entitlementConstants.isEntitlementNameValid(entitlementName) !== true
    || isActive !== true
    || (hasStringValue(childEntitlementName) === true && childEntitlements[childEntitlementName] !== true)
  ) {
    return null;
  }

  return (
    <SecureRoute
      path={path}
      exact={exact}
      component={component}
    />
  );
}

EntitlementRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.any,
  entitlementName: PropTypes.string,
  childEntitlementName: PropTypes.string,
};
