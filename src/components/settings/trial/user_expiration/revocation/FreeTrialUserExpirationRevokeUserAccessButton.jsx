import React, { useState } from "react";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { faUserAltSlash } from "@fortawesome/pro-light-svg-icons";
import {
  freeTrialUserExpirationActions
} from "components/settings/trial/user_expiration/freeTrialUserExpiration.actions";
import { useHistory } from "react-router-dom";

export default function FreeTrialUserExpirationRevokeUserAccessButton(
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

  const revokeUserAccess = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await freeTrialUserExpirationActions.revokeUserAccessById(
        getAccessToken,
        cancelTokenSource,
        userId,
      );
      toastContext.showSystemSuccessToast("Successfully revoked user access.");
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      history.push(history.location);
    } catch (error) {
      toastContext.showInlineErrorMessage(error, "Error Revoking User Access");
      setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
    }
  };

  return (
    <VanityButtonBase
      disabled={isMongoDbId(userId) !== true}
      buttonState={buttonState}
      variant={"outline-danger"}
      onClickFunction={revokeUserAccess}
      normalText={"Revoke User Access"}
      busyText={"Revoking User Access"}
      successText={"Successfully Revoked User Access"}
      errorText={"Error Revoking User Access!"}
      icon={faUserAltSlash}
      className={className}
    />
  );
}

FreeTrialUserExpirationRevokeUserAccessButton.propTypes = {
  userId: PropTypes.string,
  className: PropTypes.string,
};