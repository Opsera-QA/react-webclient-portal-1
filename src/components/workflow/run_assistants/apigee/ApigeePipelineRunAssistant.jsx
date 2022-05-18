import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import ApigeePipelineRunAssistantInitializationScreen
  from "components/workflow/run_assistants/apigee/initialization_screen/ApigeePipelineRunAssistantInitializationScreen";
import {apigeeRunParametersMetadata} from "components/workflow/run_assistants/apigee/apigeeRunParameters.metadata";
import ApigeeRunAssistantConfigurationSelectionScreen
  from "components/workflow/run_assistants/apigee/configuration_selection_screen/ApigeeRunAssistantConfigurationSelectionScreen";
import ApigeeRunAssistantMigrationObjectSelectionScreen
  from "components/workflow/run_assistants/apigee/migration_object_selection_screen/ApigeeRunAssistantMigrationObjectSelectionScreen";

export const APIGEE_RUN_ASSISTANT_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  CONFIGURATION_SELECTION_SCREEN: "CONFIGURATION_SELECTION_SCREEN",
  MIGRATION_OBJECT_SELECTION_SCREEN: "MIGRATION_OBJECT_SELECTION_SCREEN",
  CONFIRMATION_SCREEN: "CONFIRMATION_SCREEN",
};

const ApigeePipelineRunAssistant = ({ pipeline, startPipelineRunFunction, closePanelFunction, pipelineOrientation }) => {
  const [error, setError] = useState("");
  const [runAssistantScreen, setRunAssistantScreen] = useState(APIGEE_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN);
  const [apigeeRunParametersModel, setApigeeRunParametersModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (typeof pipeline === "object" && pipeline?._id) {
      const newRunParametersModel = new Model(apigeeRunParametersMetadata.newObjectFields, apigeeRunParametersMetadata, false);
      setApigeeRunParametersModel({...newRunParametersModel});
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(pipeline)]);

  const getBody = () => {
    switch (runAssistantScreen) {
      case APIGEE_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
        return (
          <ApigeePipelineRunAssistantInitializationScreen
            pipeline={pipeline}
            apigeeRunParametersModel={apigeeRunParametersModel}
            setApigeeRunParametersModel={setApigeeRunParametersModel}
            setError={setError}
            setRunAssistantScreen={setRunAssistantScreen}
          />
        );
      case APIGEE_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN:
        return (
          <ApigeeRunAssistantConfigurationSelectionScreen
            apigeeRunParametersModel={apigeeRunParametersModel}
            setApigeeRunParametersModel={setApigeeRunParametersModel}
            setRunAssistantScreen={setRunAssistantScreen}
            closePanelFunction={closePanelFunction}
          />
        );
      case APIGEE_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN:
        return (
          <ApigeeRunAssistantMigrationObjectSelectionScreen
            apigeeRunParametersModel={apigeeRunParametersModel}
            setApigeeRunParametersModel={setApigeeRunParametersModel}
            setRunAssistantScreen={setRunAssistantScreen}
            startPipelineRunFunction={startPipelineRunFunction}
            closePanelFunction={closePanelFunction}
          />
        );
      case APIGEE_RUN_ASSISTANT_SCREENS.CONFIRMATION_SCREEN:
        return (
          <div>You have reached the confirmation screen.</div>
        );
      default:
        return null;
    }
  };

  const getHelpComponentFunction = (setHelpIsShown) => {
    switch (runAssistantScreen) {
      case APIGEE_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
      case APIGEE_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN:
      case APIGEE_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN:
      default:
        return null;
    }
  };

  const getWarningMessage = () => {
    if (pipelineOrientation === "middle") {
      return (
        <div className="warning-text p-0">
          Warning! This pipeline is in a failed or incomplete state and is no longer running.  If you proceed, this will clear
          the current state of the pipeline and begin a brand new run.
        </div>
      );
    }
  };

  if (apigeeRunParametersModel == null) {
    return (
      <LoadingDialog message={"Initializing Apigee Run Parameter Assistant"} size={"sm"} />
    );
  }

  if (error && error !== "") {
    return (
      <div className="mt-5">
        <ErrorDialog error={error} />
      </div>
    );
  }

  return (
    <OverlayPanelBodyContainer
      getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
      leftSideItems={getWarningMessage()}
      isLoading={apigeeRunParametersModel?.getData("recordId")?.length === ""}
    >
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

ApigeePipelineRunAssistant.propTypes = {
  pipeline: PropTypes.object,
  startPipelineRunFunction: PropTypes.func,
  closePanelFunction: PropTypes.func,
  pipelineOrientation: PropTypes.string,
};

export default ApigeePipelineRunAssistant;
