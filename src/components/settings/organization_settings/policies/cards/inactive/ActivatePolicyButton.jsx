import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import useButtonState from "hooks/general/buttons/useButtonState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import usePolicyActions from "hooks/settings/organization_settings/policies/usePolicyActions";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ActivatePolicyButton(
  {
    policyModel,
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
  const policyActions = usePolicyActions();

  const activateSiteRole = async () => {
    try {
      buttonStateFunctions.setBusyState();
      const response = await policyActions.activatePolicy(policyModel?.getPersistData());
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

ActivatePolicyButton.propTypes = {
  policyModel: PropTypes.object,
  closeOverlayFunction: PropTypes.func,
  className: PropTypes.string,
};
