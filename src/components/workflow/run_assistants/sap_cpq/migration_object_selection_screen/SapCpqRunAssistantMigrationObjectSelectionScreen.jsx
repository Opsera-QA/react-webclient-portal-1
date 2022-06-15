import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import ErrorDialog from "components/common/status_notifications/error";
import { sapCpqRunParametersActions } from "components/workflow/run_assistants/sap_cpq/sapCpqRunParameters.actions";
import SapCpqRunAssistantMigrationObjectSelector from "components/workflow/run_assistants/sap_cpq/migration_object_selection_screen/SapCpqRunAssistantMigrationObjectSelector";
import LoadingDialog from "components/common/status_notifications/loading";

const SapCpqRunAssistantMigrationObjectSelectionScreen = ({
  sapCpqRunParametersModel,
  setSapCpqRunParametersModel,
  setRunAssistantScreen,
  closePanelFunction,
  startPipelineRunFunction,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [migrationObjectsPullTriggered, setMigrationObjectsPullTriggered] =
    useState(false);
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
      await triggerSapCpqMigrationObjectPull(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        const prependMessage =
          "Service Error Triggering Migration Object List pull from SAP:";
        toastContext.showInlineErrorMessage(error, prependMessage);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const triggerSapCpqMigrationObjectPull = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response =
      await sapCpqRunParametersActions.triggerMigrationObjectPullV2(
        getAccessToken,
        cancelSource,
        sapCpqRunParametersModel.getData("recordId"),
      );

    if (response?.data?.status !== 200) {
      const message = response?.data?.message;
      toastContext.showInlineErrorMessage(
        "Service Error Triggering Migration Object List pull from SAP: " +
          message,
      );
    } else {
      setMigrationObjectsPullTriggered(true);
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <LoadingDialog
          message={"Triggering Migration Object List Pull from SAP"}
        />
      );
    }

    if (!migrationObjectsPullTriggered) {
      return (
        <ErrorDialog
          error={"Service Error Triggering Migration Object List pull from SAP"}
        />
      );
    }

    return (
      <SapCpqRunAssistantMigrationObjectSelector
        setRunAssistantScreen={setRunAssistantScreen}
        sapCpqRunParametersModel={sapCpqRunParametersModel}
        setSapCpqRunParametersModel={setSapCpqRunParametersModel}
        closePanelFunction={closePanelFunction}
        startPipelineRunFunction={startPipelineRunFunction}
      />
    );
  };

  return (
    <div>
      <div className="h5">
        SAP CPQ Run Parameter Assistant: Migration Object Selection
      </div>
      <div className="text-muted mb-2">
        Select which migration objects will have changes impacted.
      </div>
      {getBody()}
    </div>
  );
};

SapCpqRunAssistantMigrationObjectSelectionScreen.propTypes = {
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  sapCpqRunParametersModel: PropTypes.object,
  setSapCpqRunParametersModel: PropTypes.func,
  startPipelineRunFunction: PropTypes.func,
};

export default SapCpqRunAssistantMigrationObjectSelectionScreen;
