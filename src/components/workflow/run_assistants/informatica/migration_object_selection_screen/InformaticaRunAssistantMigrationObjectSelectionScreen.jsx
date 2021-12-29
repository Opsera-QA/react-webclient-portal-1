import React, {useState, useEffect, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ErrorDialog from "components/common/status_notifications/error";
import {informaticaRunParametersActions} from "components/workflow/run_assistants/informatica/informaticaRunParameters.actions";
import InformaticaRunAssistantMigrationObjectSelector
  from "components/workflow/run_assistants/informatica/migration_object_selection_screen/InformaticaRunAssistantMigrationObjectSelector";
import LoadingDialog from "components/common/status_notifications/loading";

const InformaticaRunAssistantMigrationObjectSelectionScreen = (
  { 
    informaticaRunParametersModel, 
    setInformaticaRunParametersModel, 
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
      await triggerInformaticaMigrationObjectPull(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        const prependMessage = "Service Error Triggering Migration Object List pull from Informatica:";
        toastContext.showInlineErrorMessage(error, prependMessage);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const triggerInformaticaMigrationObjectPull = async (cancelSource = cancelTokenSource) => {
    const response = await informaticaRunParametersActions.triggerMigrationObjectPullV2(getAccessToken, cancelSource, informaticaRunParametersModel.getData("recordId"));

    if (response?.data?.status !== 200) {
      const message = response?.data?.message;
      toastContext.showInlineErrorMessage("Service Error Triggering Migration Object List pull from Informatica: " + message);
    }
    else {
      setMigrationObjectsPullTriggered(true);
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <LoadingDialog message={"Triggering Migration Object List Pull from Informatica"} />
      );
    }

    if (!migrationObjectsPullTriggered) {
      return <ErrorDialog error={"Service Error Triggering Migration Object List pull from Informatica"} />;
    }

    return (
      <InformaticaRunAssistantMigrationObjectSelector
        setRunAssistantScreen={setRunAssistantScreen}
        informaticaRunParametersModel={informaticaRunParametersModel}
        setInformaticaRunParametersModel={setInformaticaRunParametersModel}
        closePanelFunction={closePanelFunction}
        startPipelineRunFunction={startPipelineRunFunction}
      />
    );
  };


  return (
    <div>
      <div className="h5">Informatica Run Parameter Assistant: Migration Object Selection</div>
      <div className="text-muted mb-2">
        Select which migration objects will have changes impacted.
      </div>
      {getBody()}
    </div>
  );
};

InformaticaRunAssistantMigrationObjectSelectionScreen.propTypes = {
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  informaticaRunParametersModel: PropTypes.object,
  setInformaticaRunParametersModel: PropTypes.func,
  startPipelineRunFunction: PropTypes.func,
};

export default InformaticaRunAssistantMigrationObjectSelectionScreen;
