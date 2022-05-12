import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import ErrorDialog from "components/common/status_notifications/error";
import { apigeeRunParametersActions } from "components/workflow/run_assistants/apigee/apigeeRunParameters.actions";
import ApigeeRunAssistantMigrationObjectSelector
  from "components/workflow/run_assistants/apigee/migration_object_selection_screen/ApigeeRunAssistantMigrationObjectSelector";
import LoadingDialog from "components/common/status_notifications/loading";

const ApigeeRunAssistantMigrationObjectSelectionScreen = (
  {
    apigeeRunParametersModel,
    setApigeeRunParametersModel,
    setRunAssistantScreen,
    closePanelFunction,
    startPipelineRunFunction,
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [migrationObjectsPullTriggered, setMigrationObjectsPullTriggered] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await triggerApigeeMigrationObjectPull(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        const prependMessage = "Service Error Triggering Migration Object List pull from Apigee:";
        toastContext.showInlineErrorMessage(error, prependMessage);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const triggerApigeeMigrationObjectPull = async (cancelSource = cancelTokenSource) => {

    const toolId = apigeeRunParametersModel?.getData("toolId");

    const response = await apigeeRunParametersActions.triggerMigrationObjectPull(getAccessToken, cancelSource, toolId, apigeeRunParametersModel.getData("recordId"));

    if (response?.status !== 200) {
      const message = response?.data?.message;
      toastContext.showInlineErrorMessage("Service Error Triggering Migration Object List pull from Apigee: " + message);
    }
    else {
      setMigrationObjectsPullTriggered(true);
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <LoadingDialog message={"Triggering Migration Object List Pull from Apigee"} />
      );
    }

    if (!migrationObjectsPullTriggered) {
      return <ErrorDialog error={"Service Error Triggering Migration Object List pull from Apigee"} />;
    }

    return (
      <ApigeeRunAssistantMigrationObjectSelector
        setRunAssistantScreen={setRunAssistantScreen}
        apigeeRunParametersModel={apigeeRunParametersModel}
        setApigeeRunParametersModel={setApigeeRunParametersModel}
        closePanelFunction={closePanelFunction}
        startPipelineRunFunction={startPipelineRunFunction}
      />
    );
  };


  return (
    <div>
      <div className="h5">Apigee Run Parameter Assistant: Migration Object Selection</div>
      <div className="text-muted mb-2">
        Select which migration objects will have changes impacted.
      </div>
      {getBody()}
    </div>
  );
};

ApigeeRunAssistantMigrationObjectSelectionScreen.propTypes = {
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  apigeeRunParametersModel: PropTypes.object,
  setApigeeRunParametersModel: PropTypes.func,
  startPipelineRunFunction: PropTypes.func,
};

export default ApigeeRunAssistantMigrationObjectSelectionScreen;
