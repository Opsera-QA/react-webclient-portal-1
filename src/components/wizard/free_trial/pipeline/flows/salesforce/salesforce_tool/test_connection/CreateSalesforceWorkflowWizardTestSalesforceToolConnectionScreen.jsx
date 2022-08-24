import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TEST_CONNECTION_STATES } from "components/common/buttons/connection/TestConnectionButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import { parseError } from "components/common/helpers/error-helpers";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/pipeline/flows/salesforce/CreateSalesforceWorkflowWizard";
import StandaloneConsoleLogField from "components/common/fields/log/StandaloneConsoleLogField";
import { sleep } from "utils/helpers";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";

export default function CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen(
  {
    salesforceToolId,
    setCurrentScreen,
    pipeline,
    setPipeline,
    type,
    isTaskFlag
  }) {
  const [currentState, setCurrentState]  = useState(TEST_CONNECTION_STATES.READY);
  const [logs, setLogs]  = useState([]);
  const {
    cancelTokenSource,
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
        salesforceToolId,
        "Sfdc",
      );

      if (isMounted.current === true) {
        if (response?.status === 200) {
          const message = JSON.stringify(response?.data?.message);
          const status = response?.status;

          newLogs.push(
            "Connection Succeeded!\n",
            `Status: ${status}\n`,
            `Message: ${message}\n`,
            `Test Complete.\n`,
            `Continuing to next screen in a few seconds\n`,
          );

          setLogs([...newLogs]);
          setCurrentState(TEST_CONNECTION_STATES.SUCCESSFUL_CONNECTION);

          if (type === "source") {
            setPipeline({...salesforcePipelineHelper.updateSourceSalesforceToolIdForSalesforcePipelineSteps(pipeline, isTaskFlag, salesforceToolId)});
            await sleep(5000);
            if(!isTaskFlag) {
              setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN);
            }
            setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN);
          }
          else {
            setPipeline({...salesforcePipelineHelper.updateDeploymentSalesforceToolIdForSalesforcePipelineSteps(pipeline, salesforceToolId)});
            await sleep(5000);
            setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WORKFLOW_COMPLETION_SCREEN);
          }
        } else {
          const message = JSON.stringify(response?.data?.message);
          const status = response?.status;
          newLogs.push(
            `Connection Failed!\n`,
            `Status : ${status}\n`,
            `Message: ${message}\n`,
            `Test Complete.\n`,
            `Please confirm your credentials and try again.\n`,
            `Returning to credential entry in a few seconds\n`,
          );

          setLogs([...newLogs]);
          setCurrentState(TEST_CONNECTION_STATES.FAILED_CONNECTION);

          if (type === "source") {
            setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN);
          } else {
            setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN);
          }
        }
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        newLogs.push(
          `Connection Failed!\n`,
          `Error: ${parsedError}\n`,
          `Test Complete.  Please confirm your credentials and try again.\n`,
          `Returning to credential entry in a few seconds\n`,
        );

        setLogs([...newLogs]);
        setCurrentState(TEST_CONNECTION_STATES.FAILED_CONNECTION);
        await sleep(5000);

        if (type === "source") {
          setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SOURCE_SALESFORCE_TOOL_SCREEN);
        } else {
          setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_DESTINATION_SALESFORCE_TOOL_SCREEN);
        }
      }
    }
  };

  return (
    <div className={"m-3"}>
      <StandaloneConsoleLogField
        consoleLog={logs}
        isLoading={currentState === TEST_CONNECTION_STATES.TESTING}
        title={"Connection Test"}
      />
    </div>
  );
}

CreateSalesforceWorkflowWizardTestSalesforceToolConnectionScreen.propTypes = {
  salesforceToolId: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  type: PropTypes.string,
  pipeline: PropTypes.object,
  setPipeline: PropTypes.func,
  isTaskFlag: PropTypes.bool
};

