import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import InformaticaPipelineRunAssistantInitializationScreen
  from "components/workflow/run_assistants/informatica/initialization_screen/InformaticaPipelineRunAssistantInitializationScreen";
import {informaticaRunParametersMetadata} from "components/workflow/run_assistants/informatica/informaticaRunParameters.metadata";
import InformaticaRunAssistantConfigurationSelectionScreen
  from "components/workflow/run_assistants/informatica/configuration_selection_screen/InformaticaRunAssistantConfigurationSelectionScreen";
import InformaticaRunAssistantMigrationObjectSelectionScreen
  from "components/workflow/run_assistants/informatica/migration_object_selection_screen/InformaticaRunAssistantMigrationObjectSelectionScreen";

export const INFORMATICA_RUN_ASSISTANT_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  CONFIGURATION_SELECTION_SCREEN: "CONFIGURATION_SELECTION_SCREEN",
  MIGRATION_OBJECT_SELECTION_SCREEN: "MIGRATION_OBJECT_SELECTION_SCREEN",
  CONFIRMATION_SCREEN: "CONFIRMATION_SCREEN",
};

const InformaticaPipelineRunAssistant = ({ pipeline, startPipelineRunFunction, closePanelFunction, pipelineOrientation }) => {
  const [error, setError] = useState("");
  const [runAssistantScreen, setRunAssistantScreen] = useState(INFORMATICA_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN);
  const [informaticaRunParametersModel, setInformaticaRunParametersModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [helpIsShown, setHelpIsShown] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    const newRunParametersModel = new Model(informaticaRunParametersMetadata.newObjectFields, informaticaRunParametersMetadata, false);
    setInformaticaRunParametersModel({...newRunParametersModel});

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getBody = () => {
    switch (runAssistantScreen) {
      case INFORMATICA_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
        return (
          <InformaticaPipelineRunAssistantInitializationScreen
            pipeline={pipeline}
            informaticaRunParametersModel={informaticaRunParametersModel}
            setInformaticaRunParametersModel={setInformaticaRunParametersModel}
            setError={setError}
            setRunAssistantScreen={setRunAssistantScreen}
          />
        );
      case INFORMATICA_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN:
        return (
          <InformaticaRunAssistantConfigurationSelectionScreen
            informaticaRunParametersModel={informaticaRunParametersModel}
            setInformaticaRunParametersModel={setInformaticaRunParametersModel}
            setRunAssistantScreen={setRunAssistantScreen}
            closePanelFunction={closePanelFunction}
          />
        );
      case INFORMATICA_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN:
        return (
          <InformaticaRunAssistantMigrationObjectSelectionScreen
            informaticaRunParametersModel={informaticaRunParametersModel}
            setInformaticaRunParametersModel={setInformaticaRunParametersModel}
            setRunAssistantScreen={setRunAssistantScreen}
            closePanelFunction={closePanelFunction}
          />
        );
      case INFORMATICA_RUN_ASSISTANT_SCREENS.CONFIRMATION_SCREEN:
        return (
          <div>You have reached the confirmation screen.</div>
        );
      default:
        return null;
    }
  };

  const getHelpComponent = () => {
    switch (runAssistantScreen) {
      case INFORMATICA_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
      case INFORMATICA_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN:
      case INFORMATICA_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN:
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

  if (informaticaRunParametersModel == null) {
    return (
      <LoadingDialog message={"Initializing Informatica Run Parameter Assistant"} size={"sm"} />
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
      helpComponent={getHelpComponent()}
      helpIsShown={helpIsShown}
      setHelpIsShown={setHelpIsShown}
      hideCloseButton={true}
      leftSideItems={getWarningMessage()}
      isLoading={informaticaRunParametersModel?.getData("recordId")?.length === ""}
    >
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

InformaticaPipelineRunAssistant.propTypes = {
  pipeline: PropTypes.object,
  startPipelineRunFunction: PropTypes.func,
  closePanelFunction: PropTypes.func,
  pipelineOrientation: PropTypes.string,
};

export default InformaticaPipelineRunAssistant;
