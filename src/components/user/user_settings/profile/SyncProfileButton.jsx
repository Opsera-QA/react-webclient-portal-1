import React, {useState} from "react";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import userActions from "components/user/user-actions";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function SyncProfileButton() {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  const syncUserData = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await userActions.syncUser(getAccessToken, cancelTokenSource);
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      window.location.reload();
    } catch (error) {
      if (isMounted.current === true) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showErrorDialog(error);
      }
    }
  };

  return (
    <VanityButtonBase
      icon={faSync}
      buttonState={buttonState}
      normalText={"Re-sync Profile"}
      busyText={"Syncing User Profile"}
      successText={"Successfully Synced User Profile!"}
      errorText={"Error Syncing User Profile!"}
      onClickFunction={syncUserData}
      buttonSize={"sm"}
    />
  );
}
