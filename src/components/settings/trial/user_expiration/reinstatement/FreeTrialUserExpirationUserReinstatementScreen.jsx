import React from "react";
import PropTypes from "prop-types";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS
} from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";
import RevokedSsoUserSelectInput
  from "components/common/list_of_values_input/users/sso/revoked/RevokedSsoUserSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialUserExpirationReinstateUserAccessButton
  from "components/settings/trial/user_expiration/reinstatement/FreeTrialUserExpirationReinstateUserAccessButton";

export default function FreeTrialUserExpirationUserReinstatementScreen(
  {
    setCurrentScreen,
    className,
    freeTrialUserExpirationModel,
    setFreeTrialUserExpirationModel,
  }) {
  return (
    <div className={className}>
      <RevokedSsoUserSelectInput
        model={freeTrialUserExpirationModel}
        setModel={setFreeTrialUserExpirationModel}
        fieldName={"activeUserId"}
      />
      <ButtonContainerBase
        leftSideButtons={
          <BackButtonBase
            backButtonFunction={() => setCurrentScreen(FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.OPTION_SELECTION_SCREEN)}
          />
        }
      >
        <FreeTrialUserExpirationReinstateUserAccessButton
          userId={freeTrialUserExpirationModel?.getData("activeUserId")}
        />
      </ButtonContainerBase>
    </div>
  );
}

FreeTrialUserExpirationUserReinstatementScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  freeTrialUserExpirationModel: PropTypes.object,
  setFreeTrialUserExpirationModel: PropTypes.func,
};