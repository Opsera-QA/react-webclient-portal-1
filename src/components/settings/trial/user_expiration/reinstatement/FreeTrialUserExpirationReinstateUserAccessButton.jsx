import React, { useState } from "react";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { faUserAltSlash } from "@fortawesome/pro-light-svg-icons";
import { useHistory } from "react-router-dom";

export default function FreeTrialUserExpirationReinstateUserAccessButton(
  {
    className,
    userId,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const reinstateUserAccess = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await ssoUserActions.reinstateUserById(
        getAccessToken,
        cancelTokenSource,
        userId,
      );
      toastContext.showSystemSuccessToast("Successfully reinstated user access.");
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      history.push(history.location);
    } catch (error) {
      toastContext.showInlineErrorMessage(error, "Error Reinstating User Access");
      setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
    }

  };

  return (
    <VanityButtonBase
      disabled={isMongoDbId(userId) !== true}
      buttonState={buttonState}
      variant={"outline-success"}
      onClickFunction={reinstateUserAccess}
      normalText={"Reinstate User Access"}
      busyText={"Reinstating User Access"}
      successText={"Successfully Reinstated User Access"}
      errorText={"Error Reinstating User Access!"}
      icon={faUserAltSlash}
      className={className}
    />
  );
}

FreeTrialUserExpirationReinstateUserAccessButton.propTypes = {
  userId: PropTypes.string,
  className: PropTypes.string,
};