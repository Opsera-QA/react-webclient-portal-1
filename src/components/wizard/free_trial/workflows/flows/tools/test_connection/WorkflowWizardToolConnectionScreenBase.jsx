import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import { parseError } from "components/common/helpers/error-helpers";
import StandaloneConsoleLogField from "components/common/fields/log/StandaloneConsoleLogField";
import { sleep } from "utils/helpers";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

export default function WorkflowWizardToolConnectionScreenBase(
  {
    toolId,
    toolName,
    onSuccessFunction,
    onFailureFunction,
    setButtonContainer,
    className,
    title,
    successText,
    failureText,
  }) {
  const [currentState, setCurrentState] = useState(apiRequestHelper.API_REQUEST_STATES.READY);
  const [logs, setLogs] = useState([]);
  const {
    cancelTokenSource,
    getAccessToken,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase />
      );
    }

    setLogs([]);
    setCurrentState(apiRequestHelper.API_REQUEST_STATES.BUSY);
    testConnection().catch((error) => {
      if (isMounted?.current === true) {
        console.error(error);
      }
    });
  }, []);

  const testConnection = async () => {
    const newLogs = ["Starting connection test...\n"];

    try {
      setLogs([...newLogs]);
      const response = await toolsActions.checkToolConnectivityV2(
        getAccessToken,
        cancelTokenSource,
        toolId,
        toolName,
      );

      if (isMounted.current === true) {
        const message = JSON.stringify(response?.data?.message);
        const status = response?.status;

        newLogs.push(
          `${title} Succeeded!\n`,
          `Status: ${status}\n`,
          `Message: ${message}\n`,
          `Test Complete.\n`,
          successText,
        );

        setLogs([...newLogs]);
        setCurrentState(apiRequestHelper.API_REQUEST_STATES.SUCCESS);
        await sleep(5000);
        onSuccessFunction();
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        newLogs.push(
          `${title} Failed!\n`,
          `Error: ${parsedError}\n`,
          `Test Complete.\n`,
          `Please confirm your credentials and try again.\n`,
          `${failureText}`,
        );

        setLogs([...newLogs]);
        setCurrentState(apiRequestHelper.API_REQUEST_STATES.ERROR);
        await sleep(5000);
        onFailureFunction();
      }
    }
  };

  if (onFailureFunction == null || onSuccessFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <StandaloneConsoleLogField
        consoleLog={logs}
        isLoading={currentState === apiRequestHelper.API_REQUEST_STATES.BUSY}
        title={title}
      />
    </div>
  );
}

WorkflowWizardToolConnectionScreenBase.propTypes = {
  onSuccessFunction: PropTypes.func,
  onFailureFunction: PropTypes.func,
  toolId: PropTypes.string,
  toolName: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  setButtonContainer: PropTypes.func,
  failureText: PropTypes.string,
  successText: PropTypes.string,
};

WorkflowWizardToolConnectionScreenBase.defaultProps = {
  title: "Connection Test",
  successText: "Continuing to the next screen in a few seconds...",
  failureText: `Returning to credential entry in a few seconds...`,
};

