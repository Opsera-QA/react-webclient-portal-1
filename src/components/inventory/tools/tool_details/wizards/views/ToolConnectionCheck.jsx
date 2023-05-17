import React from "react";
import PropTypes from "prop-types";
import WorkflowWizardToolConnectionScreenBase from "../../../../../wizard/free_trial/workflows/flows/tools/test_connection/WorkflowWizardToolConnectionScreenBase";
import { capitalizeFirstLetter } from "../../../../../common/helpers/string-helpers";
import OverlayWizardButtonContainerBase from "../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { REGISTRY_WIZARD_SCREENS } from "../CreateToolRegistryWizard";
import { useHistory } from "react-router-dom";
import VanityButtonBase from "../../../../../../temp-library-components/button/VanityButtonBase";
import { faTriangleExclamation } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "../../../../../../hooks/useComponentStateReference";
import toolIdentifierConnectionCheckConstants
  from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

export default function ToolConnectionCheck({
  setCurrentScreen,
  setButtonContainer,
  toolData,
  backButtonFunction,
  handleClose,
}) {
  const history = useHistory();
  const { toastContext } = useComponentStateReference();

  const onSuccessFunction = () => {
    handleClose();
    history.push(`/inventory/tools/details/${toolData?.getData("_id")}`);
  };

  const onSkipFunction = () => {
    handleClose();
    history.push(`/inventory/tools/details/${toolData?.getData("_id")}`);
    toastContext.showCreateFailureResultDialog(
        toolData.getType(),
        "The tool will not be usable in Pipelines and Tasks until the connection is resolved.",
    );
  };

  const onFailureFunction = () => {
    setButtonContainer(
      <OverlayWizardButtonContainerBase>
        <VanityButtonBase
          normalText={"Skip Connection Test"}
          disabled={false}
          buttonState={"ready"}
          onClickFunction={onSkipFunction}
          tooltip={
            "The tool will not be usable in Pipelines and Tasks until the connection is resolved."
          }
          variant={"outline-warning"}
          icon={faTriangleExclamation}
        />
      </OverlayWizardButtonContainerBase>,
    );
    setCurrentScreen("connection_info");
  };

  return (
    <WorkflowWizardToolConnectionScreenBase
      className={"m-3"}
      onSuccessFunction={onSuccessFunction}
      toolId={toolData?.getData("_id")}
      onFailureFunction={onFailureFunction}
      toolName={toolIdentifierConnectionCheckConstants.getToolConnectionCheckNameForToolIdentifier(toolData?.getData("tool_identifier"))}
      title={`${capitalizeFirstLetter(
        toolData?.getData("tool_identifier"),
      )} Account Connection Test`}
      setButtonContainer={setButtonContainer}
      successText={
        "Connection Information Validation Completed Successfully. You will be routed to the tool detail page shortly."
      }
      failureText={
        "Connection Information Validation Completed Failed. Please validate the connection information in order to proceed further."
      }
    />
  );
}

ToolConnectionCheck.propTypes = {
  toolData: PropTypes.object,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
  handleClose: PropTypes.func,
};
