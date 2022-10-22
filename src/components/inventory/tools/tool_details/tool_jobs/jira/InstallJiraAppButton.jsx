import React, { useState } from "react";
import PropTypes from "prop-types";
import { faPlug } from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import { jiraActions } from "components/common/list_of_values_input/tools/jira/jira.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function InstallJiraAppButton(
  {
    toolId,
    disabled,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  const testConnection = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      const response = await jiraActions.installJiraApp(
        getAccessToken,
        cancelTokenSource,
        toolId,
      );

      if (response?.data?.status === 200) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      } else {
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
      }
    } catch (error) {
      toastContext.showFormErrorToast(
        error,
        "There was an issue installing the Jira App:"
      );
      setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
    }
  };

  if (DataParsingHelper.isValidMongoDbId(toolId) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      buttonState={buttonState}
      normalText={"Install Jira App"}
      busyText={"Installing Jira App"}
      successText={"Installation Succeeded!"}
      errorText={"Installation Failed!"}
      icon={faPlug}
      disabled={disabled}
      onClickFunction={testConnection}
    />
  );
}

InstallJiraAppButton.propTypes = {
  toolId: PropTypes.string,
  disabled: PropTypes.bool,
};