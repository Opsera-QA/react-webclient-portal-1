import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import SapCpqPipelineRunAssistantInitializationScreen from "components/workflow/run_assistants/sap_cpq/initialization_screen/SapCpqPipelineRunAssistantInitializationScreen";
import { sapCpqRunParametersMetadata } from "components/workflow/run_assistants/sap_cpq/sapCpqRunParameters.metadata";
import SapCpqRunAssistantConfigurationSelectionScreen from "components/workflow/run_assistants/sap_cpq/configuration_selection_screen/SapCpqRunAssistantConfigurationSelectionScreen";
import SapCpqRunAssistantMigrationObjectSelectionScreen from "components/workflow/run_assistants/sap_cpq/migration_object_selection_screen/SapCpqRunAssistantMigrationObjectSelectionScreen";

export const SAP_CPQ_RUN_ASSISTANT_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  CONFIGURATION_SELECTION_SCREEN: "CONFIGURATION_SELECTION_SCREEN",
  MIGRATION_OBJECT_SELECTION_SCREEN: "MIGRATION_OBJECT_SELECTION_SCREEN",
  CONFIRMATION_SCREEN: "CONFIRMATION_SCREEN",
};

const SapCpqPipelineRunAssistant = ({
  pipeline,
  startPipelineRunFunction,
  closePanelFunction,
  pipelineOrientation,
}) => {
  const [error, setError] = useState("");
  const [runAssistantScreen, setRunAssistantScreen] = useState(
    SAP_CPQ_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN,
  );
  const [sapCpqRunParametersModel, setSapCpqRunParametersModel] =
    useState(undefined);
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
      const newRunParametersModel = new Model(
        sapCpqRunParametersMetadata.newObjectFields,
        sapCpqRunParametersMetadata,
        false,
      );
      setSapCpqRunParametersModel({ ...newRunParametersModel });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(pipeline)]);

  const getBody = () => {
    switch (runAssistantScreen) {
      case SAP_CPQ_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
        return (
          <SapCpqPipelineRunAssistantInitializationScreen
            pipeline={pipeline}
            sapCpqRunParametersModel={sapCpqRunParametersModel}
            setSapCpqRunParametersModel={setSapCpqRunParametersModel}
            setError={setError}
            setRunAssistantScreen={setRunAssistantScreen}
          />
        );
      case SAP_CPQ_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN:
        return (
          <SapCpqRunAssistantConfigurationSelectionScreen
            sapCpqRunParametersModel={sapCpqRunParametersModel}
            setSapCpqRunParametersModel={setSapCpqRunParametersModel}
            setRunAssistantScreen={setRunAssistantScreen}
            closePanelFunction={closePanelFunction}
          />
        );
      case SAP_CPQ_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN:
        return (
          <SapCpqRunAssistantMigrationObjectSelectionScreen
            sapCpqRunParametersModel={sapCpqRunParametersModel}
            setSapCpqRunParametersModel={setSapCpqRunParametersModel}
            setRunAssistantScreen={setRunAssistantScreen}
            startPipelineRunFunction={startPipelineRunFunction}
            closePanelFunction={closePanelFunction}
          />
        );
      case SAP_CPQ_RUN_ASSISTANT_SCREENS.CONFIRMATION_SCREEN:
        return <div>You have reached the confirmation screen.</div>;
      default:
        return null;
    }
  };

  const getHelpComponentFunction = (setHelpIsShown) => {
    switch (runAssistantScreen) {
      case SAP_CPQ_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
      case SAP_CPQ_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN:
      case SAP_CPQ_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN:
      default:
        return null;
    }
  };

  const getWarningMessage = () => {
    if (pipelineOrientation === "middle") {
      return (
        <div className="warning-text p-0">
          Warning! This pipeline is in a failed or incomplete state and is no
          longer running. If you proceed, this will clear the current state of
          the pipeline and begin a brand new run.
        </div>
      );
    }
  };

  if (sapCpqRunParametersModel == null) {
    return (
      <LoadingDialog
        message={"Initializing SAP CPQ Run Parameter Assistant"}
        size={"sm"}
      />
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
      isLoading={sapCpqRunParametersModel?.getData("recordId")?.length === ""}
    >
      <div className={"m-3"}>{getBody()}</div>
    </OverlayPanelBodyContainer>
  );
};

SapCpqPipelineRunAssistant.propTypes = {
  pipeline: PropTypes.object,
  startPipelineRunFunction: PropTypes.func,
  closePanelFunction: PropTypes.func,
  pipelineOrientation: PropTypes.string,
};

export default SapCpqPipelineRunAssistant;
