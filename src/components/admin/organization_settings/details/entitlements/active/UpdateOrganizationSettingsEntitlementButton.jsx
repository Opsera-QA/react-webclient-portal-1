import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import useButtonState from "hooks/general/buttons/useButtonState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useEntitlementAdministrationActions
  from "hooks/settings/organization_settings/entitlements/useEntitlementAdministrationActions";

export default function UpdateOrganizationSettingsEntitlementButton(
  {
    entitlementModel,
    organizationDomain,
    organizationAccountName,
    closeOverlayFunction,
    className,
  }) {
  const history = useHistory();
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    buttonState,
    buttonStateFunctions,
  } = useButtonState();
  const entitlementAdministrationActions = useEntitlementAdministrationActions();

  const updateEntitlement = async () => {
    try {
      buttonStateFunctions.setBusyState();
      const response = await entitlementAdministrationActions.updateEntitlement(
        entitlementModel?.getMongoDbId(),
        entitlementModel?.getPersistData(),
        organizationDomain,
        organizationAccountName,
      );
      console.log("response: " + JSON.stringify(response));
      toastContext.showUpdateSuccessResultDialog("Enitlement");
      buttonStateFunctions.setSuccessState();
      history.push(history.location);
      closeOverlayFunction();
    } catch (error) {
      toastContext.showUpdateFailureResultDialog("Entitlement", error);
      buttonStateFunctions.setErrorState();
    }
  };

  return (
    <VanityButtonBase
      buttonState={buttonState}
      className={className}
      normalText={"Save Entitlement"}
      busyText={"Saving Entitlement"}
      errorText={"Error Saving Entitlement!"}
      successText={"Successfully Saved Entitlement!"}
      onClickFunction={updateEntitlement}
    />
  );
}

UpdateOrganizationSettingsEntitlementButton.propTypes = {
  entitlementModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountName: PropTypes.string,
  closeOverlayFunction: PropTypes.func,
  className: PropTypes.string,
};
