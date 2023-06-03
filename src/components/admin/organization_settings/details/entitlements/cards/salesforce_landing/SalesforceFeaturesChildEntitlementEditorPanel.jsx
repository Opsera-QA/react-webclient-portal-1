import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import salesforceFeatureEntitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/salesforce/salesforceFeatureEntitlement.constants";

export default function SalesforceFeaturesChildEntitlementEditorPanel(
  {
    childEntitlementModel,
    updateParentModel,
  }) {
  if (childEntitlementModel == null) {
    return null;
  }

  return (
    <>
      <BooleanToggleInput
        dataObject={childEntitlementModel}
        setDataObject={updateParentModel}
        fieldName={salesforceFeatureEntitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_LANDING_SCREEN}
      />
      <BooleanToggleInput
        dataObject={childEntitlementModel}
        setDataObject={updateParentModel}
        fieldName={salesforceFeatureEntitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_DATA_MIGRATION_TASK}
      />
    </>
  );
}

SalesforceFeaturesChildEntitlementEditorPanel.propTypes = {
  childEntitlementModel: PropTypes.object,
  updateParentModel: PropTypes.func,
};
