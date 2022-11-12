import React, { useState } from "react";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { faUserPlus } from "@fortawesome/pro-light-svg-icons";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  freeTrialUserExpirationActions
} from "components/settings/trial/user_expiration/freeTrialUserExpiration.actions";
import { useHistory } from "react-router-dom";

export default function FreeTrialUserExpirationExtendUserAccessButton(
  {
    className,
    userId,
    alreadyExtended,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);

  const extendFreeTrialUserAccess = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await freeTrialUserExpirationActions.extendUserAccessById(
        getAccessToken,
        cancelTokenSource,
        userId,
      );
      toastContext.showSystemSuccessToast("Successfully extended user access.");
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      history.push(history.location);
    } catch (error) {
      toastContext.showInlineErrorMessage(error, "Error Extending User Access");
      setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
    }

  };

  if (alreadyExtended === true) {
    return (
      <VanityButtonBase
        disabled={isMongoDbId(userId) !== true}
        buttonState={buttonState}
        variant={"warning"}
        onClickFunction={extendFreeTrialUserAccess}
        normalText={"Allow Unlimited User Access"}
        busyText={"Extending User Access"}
        successText={"Successfully Extended User Access"}
        errorText={"Error Extending User Access!"}
        icon={faUserPlus}
        className={className}
      />
    );
  }

  return (
    <VanityButtonBase
      disabled={isMongoDbId(userId) !== true}
      buttonState={buttonState}
      variant={"outline-success"}
      onClickFunction={extendFreeTrialUserAccess}
      normalText={"Extend User Access"}
      busyText={"Extending User Access"}
      successText={"Successfully Extended User Access"}
      errorText={"Error Extending User Access!"}
      icon={faUserPlus}
      className={className}
    />
  );
}

FreeTrialUserExpirationExtendUserAccessButton.propTypes = {
  userId: PropTypes.string,
  className: PropTypes.string,
  alreadyExtended: PropTypes.bool,
};