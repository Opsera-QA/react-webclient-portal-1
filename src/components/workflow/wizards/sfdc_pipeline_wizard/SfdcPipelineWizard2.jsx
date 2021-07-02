import React, {useState} from "react";
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

const SfdcPipelineWizard2 = ({ pipeline, handlePipelineWizardRequest, handleClose, refreshPipelineActivityData, gitTaskData }) => {
  const [error, setError] = useState("");
  const [pipelineWizardScreen, setPipelineWizardScreen] = useState(PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [pipelineWizardModel, setPipelineWizardModel] = useState(undefined);

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

  if (error && error !== "") {
    return (
      <div className="mt-5">
        <ErrorDialog error={error} />
      </div>
    );
  }

  return (
    <div className={"m-3"}>
      {getBody()}
    </div>
  );
};

SfdcPipelineWizard2.propTypes = {
  pipelineId: PropTypes.string,
  pipeline: PropTypes.object,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func,
  gitTaskData: PropTypes.object,
};

export default SfdcPipelineWizard2;
