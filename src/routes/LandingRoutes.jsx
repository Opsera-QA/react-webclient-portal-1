import React  from "react";
import { Route } from "react-router-dom";
import Home from "Home";
import EntitlementRoute from "temp-library-components/routes/EntitlementRoute";
import SalesforceLandingScreen from "components/landing/v2/salesforce/SalesforceLandingScreen";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import salesforceFeatureEntitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/salesforce/salesforceFeatureEntitlement.constants";

export default function LandingRoutes() {
  return (
    <>
      <Route
        path="/"
        exact
        component={Home}
      />
      <EntitlementRoute
        path="/salesforce"
        exact
        component={SalesforceLandingScreen}
        entitlementName={entitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_LANDING_SCREEN}
        childEntitlementName={salesforceFeatureEntitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_LANDING_SCREEN}
      />
    </>
  );
}
