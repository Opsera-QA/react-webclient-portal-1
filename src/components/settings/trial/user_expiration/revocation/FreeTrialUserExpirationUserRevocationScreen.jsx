import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS
} from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";
import ActiveSsoUserSelectInput from "components/common/list_of_values_input/users/sso/active/ActiveSsoUserSelectInput";

export default function FreeTrialUserExpirationUserRevocationScreen(
  {
    setCurrentScreen,
    className,
    freeTrialUserExpirationModel,
    setFreeTrialUserExpirationModel
  }) {
  return (
    <div className={className}>
      <ActiveSsoUserSelectInput
        model={freeTrialUserExpirationModel}
        setModel={setFreeTrialUserExpirationModel}
        fieldName={"revokeUserId"}
      />
      <BackButtonBase
        backButtonFunction={() => setCurrentScreen(FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.OPTION_SELECTION_SCREEN)}
      />
    </div>
  );
}

FreeTrialUserExpirationUserRevocationScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  freeTrialUserExpirationModel: PropTypes.object,
  setFreeTrialUserExpirationModel: PropTypes.func,
};