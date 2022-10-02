import React from "react";
import PropTypes from "prop-types";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import {
  FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREENS
} from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagement";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialExtendUserAccessSelectInput
  from "components/settings/trial/user_expiration/extension/input/FreeTrialExtendUserAccessSelectInput";
import FreeTrialUserExpirationExtendUserAccessButton
  from "components/settings/trial/user_expiration/extension/FreeTrialUserExpirationExtendUserAccessButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function FreeTrialUserExpirationExtendUserAccessScreen(
  {
    setCurrentScreen,
    className,
    freeTrialUserExpirationModel,
    setFreeTrialUserExpirationModel
  }) {
  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={"A Free Trial user can only be extended once. Afterwards, they will be added to the unlimited rule."}
      />
      <FreeTrialExtendUserAccessSelectInput
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
        <FreeTrialUserExpirationExtendUserAccessButton
          userId={freeTrialUserExpirationModel?.getData("extendUserId")}
          alreadyExtended={freeTrialUserExpirationModel?.getData("alreadyExtended")}
        />
      </ButtonContainerBase>
    </div>
  );
}

FreeTrialUserExpirationExtendUserAccessScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  freeTrialUserExpirationModel: PropTypes.object,
  setFreeTrialUserExpirationModel: PropTypes.func,
};