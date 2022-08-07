import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TEST_CONNECTION_STATES } from "components/common/buttons/connection/TestConnectionButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import { parseError } from "components/common/helpers/error-helpers";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import ConsoleLogOverlay from "components/common/overlays/log/ConsoleLogOverlay";
import {
  CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS
} from "components/wizard/free_trial/pipeline/salesforce_flow/CreateSalesforcePipelineWizard";

function TestGitToolConnectionScreen(
  {
    gitToolId,
    setCurrentScreen,
    gitToolOption,
  }) {
  const [currentState, setCurrentState]  = useState(TEST_CONNECTION_STATES.READY);
  const [logs, setLogs]  = useState([]);
  const {
    cancelTokenSource,
    toastContext,
    getAccessToken,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    setLogs([]);
    setCurrentState(TEST_CONNECTION_STATES.TESTING);
    testConnection().catch((error) => {
      if (isMounted?.current === true) {
        console.error(error);
      }
    });
  }, []);

  const testConnection = async () => {
    const newLogs = ["Starting connection test of tool...\n"];

    try {
      setLogs([...newLogs]);
      const response = await toolsActions.checkToolConnectivityV2(
        getAccessToken,
        cancelTokenSource,
        gitToolId,
        capitalizeFirstLetter(gitToolOption),
      );

      if (isMounted.current === true) {
        if (response?.status === 200) {
          const message = JSON.stringify(response?.data?.message);
          const status = response?.status;

          newLogs.push(
            "Connection Succeeded!\n",
            `Status: ${status}\n`,
            `Message: ${message}\n`,
            `Test Complete.\nPlease close this window to proceed.\n`,
          );

          setLogs(newLogs);
          setCurrentState(TEST_CONNECTION_STATES.SUCCESSFUL_CONNECTION);
          setCurrentScreen(CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.CREATE_SALESFORCE_SOURCE_TOOL_SCREEN);
        } else {
          const message = JSON.stringify(response?.data?.message);
          const status = response?.status;
          newLogs.push(
            `Connection Failed!\n`,
            `Status : ${status}\n`,
            `Message: ${message}\n`,
            `Test Complete. \nPlease close this panel, address the issue and try again.\n`,
          );

          setLogs(newLogs);
          setCurrentState(TEST_CONNECTION_STATES.FAILED_CONNECTION);
          setCurrentScreen(CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.UPDATE_GIT_TOOL_SCREEN);
        }
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        newLogs.push(
          `Connection Failed!\n`,
          `Error: ${parsedError}\n`,
          `Test Complete.  Please close this panel, address the issue and try again.\n`,
        );

        setLogs(newLogs);
        setCurrentState(TEST_CONNECTION_STATES.FAILED_CONNECTION);
        setCurrentScreen(CREATE_SALESFORCE_PIPELINE_WIZARD_SCREENS.UPDATE_GIT_TOOL_SCREEN);
      }
    }
  };

  return (
    <div className={"m-3"}>
      <ConsoleLogOverlay
        body={logs}
      />
      {/*<ButtonContainerBase>*/}
      {/*  <HandleGitToolCreationButton*/}
      {/*    selectedOption={gitToolOption}*/}
      {/*    gitToolCreationModel={gitToolCreationModel}*/}
      {/*    setCurrentScreen={setCurrentScreen}*/}
      {/*    setGitToolId={setGitToolId}*/}
      {/*  />*/}
      {/*</ButtonContainerBase>*/}
    </div>
  );
}

TestGitToolConnectionScreen.propTypes = {
  gitToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  gitToolOption: PropTypes.string,
};

export default TestGitToolConnectionScreen;


