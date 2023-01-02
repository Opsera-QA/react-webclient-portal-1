import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import {siteRoleActions} from "components/settings/ldap_site_roles/siteRole.actions";
import useButtonState from "hooks/general/buttons/useButtonState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ActivateSiteRoleButton(
  {
    siteRoleName,
    closeOverlayFunction,
    className,
  }) {
  const history = useHistory();
  const {
    toastContext,
    cancelTokenSource,
    getAccessToken,
    userData,
  } = useComponentStateReference();
  const {
    buttonState,
    buttonStateFunctions,
  } = useButtonState();

  const activateSiteRole = async () => {
    try {
      const orgDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");
      buttonStateFunctions.setBusyState();
      await siteRoleActions.activateSiteRole(getAccessToken, cancelTokenSource, siteRoleName);
      closeOverlayFunction();
      toastContext.showInformationToast("The Site Role has been successfully activated.");
      buttonStateFunctions.setSuccessState();
      history.push(`/settings/${orgDomain}/site-roles/details/${siteRoleName}`);
    } catch (error) {
      toastContext.showFormErrorToast(error, `Error activating Site Role:`);
      buttonStateFunctions.setErrorState();
    }
  };

  return (
    <VanityButtonBase
      buttonState={buttonState}
      className={className}
      normalText={"Activate Site Role"}
      busyText={"Activating Site Role"}
      errorText={"Error Activating Site Role!"}
      successText={"Successfully Activated Site Role!"}
      onClickFunction={activateSiteRole}
    />
  );
}

ActivateSiteRoleButton.propTypes = {
  siteRoleName: PropTypes.string,
  closeOverlayFunction: PropTypes.func,
  className: PropTypes.string,
};
