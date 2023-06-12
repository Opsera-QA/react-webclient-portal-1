import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import useButtonState from "hooks/general/buttons/useButtonState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import useEntitlementAdministrationActions
  from "hooks/settings/organization_settings/entitlements/useEntitlementAdministrationActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function OrganizationSettingsActivateEntitlementButton(
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

  const activateEntitlement = async () => {
    try {
      buttonStateFunctions.setBusyState();
      const response = await entitlementAdministrationActions.activateEntitlement(
        entitlementModel?.getPersistData(),
        organizationDomain,
        organizationAccountName,
      );
      const entitlement = DataParsingHelper.parseNestedObject(response, "data.data");

      if (entitlement) {
        toastContext.showInformationToast("The Entitlement has been successfully activated.");
        buttonStateFunctions.setSuccessState();
        history.push(history.location);
        closeOverlayFunction();
      }
    } catch (error) {
      toastContext.showFormErrorToast(error, `Error activating Entitlement:`);
      buttonStateFunctions.setErrorState();
    }
  };

  return (
    <VanityButtonBase
      buttonState={buttonState}
      className={className}
      normalText={"Activate Entitlement"}
      busyText={"Activating Entitlement"}
      errorText={"Error Activating Entitlement!"}
      successText={"Successfully Activated Entitlement!"}
      onClickFunction={activateEntitlement}
    />
  );
}

OrganizationSettingsActivateEntitlementButton.propTypes = {
  entitlementModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountName: PropTypes.string,
  closeOverlayFunction: PropTypes.func,
  className: PropTypes.string,
};
