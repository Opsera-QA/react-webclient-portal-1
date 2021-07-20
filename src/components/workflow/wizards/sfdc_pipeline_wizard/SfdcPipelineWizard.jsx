import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SfdcPipelineWizardComponentSelector from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardComponentSelector";
import ErrorDialog from "components/common/status_notifications/error";
import SfdcPipelineWizardXmlViewer from "components/workflow/wizards/sfdc_pipeline_wizard/xml_viewer/SfdcPipelineWizardXmlViewer";
import SfdcPipelineWizardUnitTestSelector from "components/workflow/wizards/sfdc_pipeline_wizard/unit_test_selector/SfdcPipelineWizardUnitTestSelector";
import SfdcPipelineWizardProfileComponentSelector from "components/workflow/wizards/sfdc_pipeline_wizard/profile_component_selector/SfdcPipelineWizardProfileComponentSelector";
import SfdcPipelineWizardStandardFileSelector
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/SfdcPipelineWizardStandardFileSelector";
import SfdcPipelineWizardGitTasksFileSelector
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/SfdcPipelineWizardGitTasksFileSelector";
import SfdcPipelineWizardOrgToOrgFileSelector
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/SfdcPipelineWizardOrgToOrgFileSelector";
import SfdcPipelineWizardInitializationScreen
  from "components/workflow/wizards/sfdc_pipeline_wizard/initialization_screen/SfdcPipelineWizardInitializationScreen";
import axios from "axios";
import sfdcPipelineWizardMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-wizard-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import SfdcWizardInitializationHelpDocumentation
  from "components/common/help/documentation/pipelines/wizard/SfdcWizardInitializationHelpDocumentation";
import SfdcWizardComponentTypeSelectionHelpDocumentation
  from "components/common/help/documentation/pipelines/wizard/SfdcWizardComponentTypeSelectionHelpDocumentation";
import {AuthContext} from "contexts/AuthContext";
import SfdcWizardUnitTestSelectionViewHelpDocumentation
  from "components/common/help/documentation/pipelines/wizard/SfdcWizardUnitTestSelectionViewHelpDocumentation";
import SfdcWizardFileSelectionHelpDocumentation
  from "components/common/help/documentation/pipelines/wizard/SfdcWizardFileSelectionHelpDocumentation";
import SfdcWizardXmlViewerHelpDocumentation
  from "components/common/help/documentation/pipelines/wizard/SfdcWizardXmlViewerHelpDocumentation";

export const PIPELINE_WIZARD_SCREENS = {
  INITIALIZATION_SCREEN: "INITIALIZATION_SCREEN",
  COMPONENT_SELECTOR: "COMPONENT_SELECTOR",
  STANDARD_FILE_SELECTOR: "STANDARD_FILE_SELECTOR",
  GIT_TASKS_FILE_SELECTOR: "GIT_TASKS_FILE_SELECTOR",
  ORG_TO_ORG_FILE_SELECTOR: "ORG_TO_ORG_FILE_SELECTOR",
  PROFILE_COMPONENT_SELECTOR: "PROFILE_COMPONENT_SELECTOR",
  XML_VIEWER: "XML_VIEWER",
  UNIT_TEST_SELECTOR: "UNIT_TEST_SELECTOR",
};

const SfdcPipelineWizard = ({ pipeline, handlePipelineWizardRequest, handleClose, refreshPipelineActivityData, gitTaskData }) => {
  const [error, setError] = useState("");
  const [pipelineWizardScreen, setPipelineWizardScreen] = useState(PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [pipelineWizardModel, setPipelineWizardModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [helpIsShown, setHelpIsShown] = useState(false);
  const { featureFlagHideItemInProd } = useContext(AuthContext);

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

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getBody = () => {
    switch (pipelineWizardScreen) {
      case PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <SfdcPipelineWizardInitializationScreen
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            setPipelineWizardScreen={setPipelineWizardScreen}
            handleClose={handleClose}
            pipeline={pipeline}
            gitTaskData={gitTaskData}
            setError={setError}
          />
        );
      case PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR:
        return (
          <SfdcPipelineWizardComponentSelector
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            setPipelineWizardScreen={setPipelineWizardScreen}
            handleClose={handleClose}
          />
        );

      case PIPELINE_WIZARD_SCREENS.STANDARD_FILE_SELECTOR:
        return (
          <SfdcPipelineWizardStandardFileSelector
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            setPipelineWizardScreen={setPipelineWizardScreen}
            handleClose={handleClose}
          />
        );
      case PIPELINE_WIZARD_SCREENS.GIT_TASKS_FILE_SELECTOR:
        return (
          <SfdcPipelineWizardGitTasksFileSelector
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            setPipelineWizardScreen={setPipelineWizardScreen}
            handleClose={handleClose}
          />
        );
      case PIPELINE_WIZARD_SCREENS.ORG_TO_ORG_FILE_SELECTOR:
        return (
          <SfdcPipelineWizardOrgToOrgFileSelector
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            setPipelineWizardScreen={setPipelineWizardScreen}
            handleClose={handleClose}
          />
        );
      case PIPELINE_WIZARD_SCREENS.PROFILE_COMPONENT_SELECTOR:
        return (
          <SfdcPipelineWizardProfileComponentSelector
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            handleClose={handleClose}
            setPipelineWizardScreen={setPipelineWizardScreen}
          />
        );
      case PIPELINE_WIZARD_SCREENS.UNIT_TEST_SELECTOR:
        return (
          <SfdcPipelineWizardUnitTestSelector
            pipelineWizardModel={pipelineWizardModel}
            handleClose={handleClose}
            setPipelineWizardScreen={setPipelineWizardScreen}
          />
        );
      case PIPELINE_WIZARD_SCREENS.XML_VIEWER:
        return (
          <SfdcPipelineWizardXmlViewer
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
            handleClose={handleClose}
            setPipelineWizardScreen={setPipelineWizardScreen}
            setError={setError}
            refreshPipelineActivityData={refreshPipelineActivityData}
            handlePipelineWizardRequest={handlePipelineWizardRequest}
          />
        );
    }
  };

  const getHelpComponent = () => {
    // TODO: Remove feature flag after verification
    if (featureFlagHideItemInProd()) {
      return null;
    }

    switch (pipelineWizardScreen) {
      case PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <SfdcWizardInitializationHelpDocumentation
            closeHelpPanel={() => setHelpIsShown(false)}
          />
        );
      case PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR:
        return (
          <SfdcWizardComponentTypeSelectionHelpDocumentation
            closeHelpPanel={() => setHelpIsShown(false)}
          />
        );
      case PIPELINE_WIZARD_SCREENS.STANDARD_FILE_SELECTOR:
      case PIPELINE_WIZARD_SCREENS.GIT_TASKS_FILE_SELECTOR:
      case PIPELINE_WIZARD_SCREENS.ORG_TO_ORG_FILE_SELECTOR:
      case PIPELINE_WIZARD_SCREENS.PROFILE_COMPONENT_SELECTOR:
        return (
          <SfdcWizardFileSelectionHelpDocumentation
            closeHelpPanel={() => setHelpIsShown(false)}
          />
        );
      case PIPELINE_WIZARD_SCREENS.UNIT_TEST_SELECTOR:
        return (
          <SfdcWizardUnitTestSelectionViewHelpDocumentation
            closeHelpPanel={() => setHelpIsShown(false)}
          />
        );
      case PIPELINE_WIZARD_SCREENS.XML_VIEWER:
        return (
          <SfdcWizardXmlViewerHelpDocumentation
            closeHelpPanel={() => setHelpIsShown(false)}
          />
        );
      default:
        return null;
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
      className={"m-3"}
      helpComponent={getHelpComponent()}
      helpIsShown={helpIsShown}
      setHelpIsShown={setHelpIsShown}
      hideCloseButton={true}
      isLoading={pipelineWizardModel?.getData("recordId")?.length === ""}
    >
      {getBody()}
    </OverlayPanelBodyContainer>
  );
};

SfdcPipelineWizard.propTypes = {
  pipelineId: PropTypes.string,
  pipeline: PropTypes.object,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func,
  gitTaskData: PropTypes.object,
};

export default SfdcPipelineWizard;
