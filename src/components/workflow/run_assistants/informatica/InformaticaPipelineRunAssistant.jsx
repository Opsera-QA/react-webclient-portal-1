import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import sfdcPipelineWizardMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-wizard-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {pipelineHelpers} from "components/common/helpers/pipelines/pipeline.helpers";
import InformaticaPipelineRunAssistantInitializationScreen
  from "components/workflow/run_assistants/informatica/initialization_screen/InformaticaPipelineRunAssistantInitializationScreen";

export const INFORMATICA_RUN_ASSISTANT_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  MIGRATION_OBJECT_SELECTOR: "MIGRATION_OBJECT_SELECTOR",
};

const InformaticaPipelineRunAssistant = ({ pipeline, startPipelineRunFunction, closePanelFunction, pipelineOrientation }) => {
  const [error, setError] = useState("");
  const [pipelineWizardScreen, setPipelineWizardScreen] = useState(INFORMATICA_RUN_ASSISTANT_SCREENS.INITIALIZATION_SCREEN);
  const [pipelineWizardModel, setPipelineWizardModel] = useState(undefined);
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
    let newPipelineWizardModel = new Model(sfdcPipelineWizardMetadata.newObjectFields, sfdcPipelineWizardMetadata, false);
    // TODO: THe way objects are referenced is causing issues with this. I THINK creating an sfdcPipelineWizard model
    //  with the metadata inside will resolve the issue with it getting instantiated and staying the same
    //  but I need to do further testing to ensure. At that time remove this.
    newPipelineWizardModel.setData("fromDate", new Date(new Date().setHours(0,0,0,0)));
    newPipelineWizardModel.setData("toDate", new Date());
    // TODO: This should be fixed now so setting this to empty array is probably not necessary. I need to do further testing
    //  after which I will remove this line
    newPipelineWizardModel.setData("selectedComponentTypes", []);
    setPipelineWizardModel({...newPipelineWizardModel});

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

  const getFields = () => {
    return (
      <Row>
        <Col sm={6}>
          <TextFieldBase dataObject={pipelineWizardModel} fieldName={"accountUsername"} />
        </Col>
        <Col sm={6}>
          <TextFieldBase dataObject={pipelineWizardModel} fieldName={"gitBranch"} />
        </Col>
      </Row>
    );
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

  if (pipelineWizardModel == null) {
    return (
      <LoadingDialog message={"Initializing SFDC Pipeline Wizard"} size={"sm"} />
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
      isLoading={pipelineWizardModel?.getData("recordId")?.length === ""}
    >
      {/*{getFields()}*/}
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
