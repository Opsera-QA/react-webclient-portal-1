import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import useButtonState from "hooks/general/buttons/useButtonState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useFeatureFlagAdministrationActions
  from "hooks/settings/organization_settings/feature_flags/useFeatureFlagAdministrationActions";

export default function OrganizationSettingsActivateFeatureFlagButton(
  {
    featureFlagModel,
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
  const featureFlagAdministrationActions = useFeatureFlagAdministrationActions();

  const activateSiteRole = async () => {
    try {
      buttonStateFunctions.setBusyState();
      const response = await featureFlagAdministrationActions.activateFeatureFlag(
        featureFlagModel?.getPersistData(),
        organizationDomain,
        organizationAccountName,
      );
      const featureFlag = DataParsingHelper.parseNestedObject(response, "data.data");

      if (featureFlag) {
        toastContext.showInformationToast("The Feature Flag has been successfully activated.");
        buttonStateFunctions.setSuccessState();
        history.push(history.location);
        closeOverlayFunction();
      }
    } catch (error) {
      toastContext.showFormErrorToast(error, `Error activating Feature Flag:`);
      buttonStateFunctions.setErrorState();
    }
  };

  return (
    <VanityButtonBase
      buttonState={buttonState}
      className={className}
      normalText={"Activate Feature Flag"}
      busyText={"Activating Feature Flag"}
      errorText={"Error Activating Feature Flag!"}
      successText={"Successfully Activated Feature Flag!"}
      onClickFunction={activateSiteRole}
    />
  );
}

OrganizationSettingsActivateFeatureFlagButton.propTypes = {
  featureFlagModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountName: PropTypes.string,
  closeOverlayFunction: PropTypes.func,
  className: PropTypes.string,
};
