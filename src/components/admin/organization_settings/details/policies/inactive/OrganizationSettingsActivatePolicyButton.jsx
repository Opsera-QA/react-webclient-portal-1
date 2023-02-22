import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import useButtonState from "hooks/general/buttons/useButtonState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import usePolicyAdministrationActions
  from "hooks/settings/organization_settings/policies/usePolicyAdministrationActions";

export default function OrganizationSettingsActivatePolicyButton(
  {
    policyModel,
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
  const policyAdministrationActions = usePolicyAdministrationActions();

  const activateSiteRole = async () => {
    try {
      buttonStateFunctions.setBusyState();
      const response = await policyAdministrationActions.activatePolicy(
        policyModel?.getPersistData(),
        organizationDomain,
        organizationAccountName,
      );
      const policy = DataParsingHelper.parseNestedObject(response, "data.data");

      if (policy) {
        toastContext.showInformationToast("The Policy has been successfully activated.");
        buttonStateFunctions.setSuccessState();
        history.push(policyHelper.getDetailViewLink(policy?._id));
        closeOverlayFunction();
      }
    } catch (error) {
      toastContext.showFormErrorToast(error, `Error activating Policy:`);
      buttonStateFunctions.setErrorState();
    }
  };

  return (
    <VanityButtonBase
      buttonState={buttonState}
      className={className}
      normalText={"Activate Policy"}
      busyText={"Activating Policy"}
      errorText={"Error Activating Policy!"}
      successText={"Successfully Activated Policy!"}
      onClickFunction={activateSiteRole}
    />
  );
}

OrganizationSettingsActivatePolicyButton.propTypes = {
  policyModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountName: PropTypes.string,
  closeOverlayFunction: PropTypes.func,
  className: PropTypes.string,
};
