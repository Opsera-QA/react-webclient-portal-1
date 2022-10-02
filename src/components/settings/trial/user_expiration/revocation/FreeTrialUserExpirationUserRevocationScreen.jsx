import React from "react";
import PropTypes from "prop-types";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS
} from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";
import FreeTrialRevokeUserSelectInput
  from "components/settings/trial/user_expiration/revocation/input/FreeTrialRevokeUserSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialUserExpirationRevokeUserAccessButton
  from "components/settings/trial/user_expiration/revocation/FreeTrialUserExpirationRevokeUserAccessButton";

export default function FreeTrialUserExpirationUserRevocationScreen(
  {
    setCurrentScreen,
    className,
    freeTrialUserExpirationModel,
    setFreeTrialUserExpirationModel
  }) {
  return (
    <div className={className}>
      <FreeTrialRevokeUserSelectInput
        model={freeTrialUserExpirationModel}
        setModel={setFreeTrialUserExpirationModel}
      />
      <ButtonContainerBase
        leftSideButtons={
          <BackButtonBase
            backButtonFunction={() => setCurrentScreen(FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS.OPTION_SELECTION_SCREEN)}
          />
        }
      >
        <FreeTrialUserExpirationRevokeUserAccessButton
          userId={freeTrialUserExpirationModel?.getData("revokeUserId")}
        />
      </ButtonContainerBase>
    </div>
  );
}

FreeTrialUserExpirationUserRevocationScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  freeTrialUserExpirationModel: PropTypes.object,
  setFreeTrialUserExpirationModel: PropTypes.func,
};