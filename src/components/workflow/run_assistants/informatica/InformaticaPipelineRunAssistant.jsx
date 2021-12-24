import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {pipelineHelpers} from "components/common/helpers/pipelines/pipeline.helpers";
import InformaticaPipelineRunAssistantInitializationScreen
  from "components/workflow/run_assistants/informatica/initialization_screen/InformaticaPipelineRunAssistantInitializationScreen";
import {informaticaRunParametersMetadata} from "components/workflow/run_assistants/informatica/informaticaRunParameters.metadata";

export const INFORMATICA_RUN_ASSISTANT_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  MIGRATION_OBJECT_SELECTOR: "MIGRATION_OBJECT_SELECTOR",
};

const InformaticaPipelineRunAssistant = ({ pipeline, startPipelineRunFunction, closePanelFunction, pipelineOrientation }) => {
  const [error, setError] = useState("");
  const [pipelineWizardScreen, setPipelineWizardScreen] = useState(INFORMATICA_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN);
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

    const stepArrayIndex = pipelineHelpers.findStepIndex(pipeline, "informatica");
    if (stepArrayIndex === -1) {
      setError(
        "Warning, this pipeline is missing the default Informatica Step needed. Please edit the workflow and add the Informatica step in order to run this pipeline."
      );
      return;
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getBody = () => {
    switch (pipelineWizardScreen) {
      case INFORMATICA_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
        return (
          <InformaticaPipelineRunAssistantInitializationScreen
            pipeline={pipeline}
            informaticaRunParametersModel={informaticaRunParametersModel}
            setInformaticaRunParametersModel={setInformaticaRunParametersModel}
          />
        );
      case INFORMATICA_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTOR:
      default:
        return null;
    }
  };

  const getHelpComponent = () => {
    switch (pipelineWizardScreen) {
      case INFORMATICA_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN:
      case INFORMATICA_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTOR:
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
