import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import templateEditorMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import PipelineTemplateEditorPanel from "components/admin/pipeline_templates/details/PipelineTemplateEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import modelHelpers from "components/common/model/modelHelpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import NewPipelineTemplateWizardFlowSelectionScreen
  from "components/admin/pipeline_templates/create/wizard/flow_selection/NewPipelineTemplateWizardFlowSelectionScreen";
import PipelineTemplateManagementWizardImportPipelineSelectionScreen
  from "components/admin/pipeline_templates/create/wizard/import_pipeline/PipelineTemplateManagementWizardImportPipelineSelectionScreen";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import CenterOverlayContainer, { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";

export const NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS = {
  NEW_TEMPLATE_FLOW_SELECTION_SCREEN: "new_template_flow_selection_screen",
  IMPORT_FROM_PIPELINE: "import_from_pipeline",
  PIPELINE_TEMPLATE_EDITOR_PANEL: "pipeline_template_editor_panel",
};

function NewPipelineTemplateWizard({ loadData } ) {
  const toastContext = useContext(DialogToastContext);
  const [currentScreen, setCurrentScreen] = useState(undefined);
  const [pipelineTemplateModel, setPipelineTemplateModel] = useState(undefined);
  const { isMounted } = useComponentStateReference();

  useEffect(() => {
    setCurrentScreen(NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.NEW_TEMPLATE_FLOW_SELECTION_SCREEN);
    const newPipelineTemplateModel = modelHelpers.parseObjectIntoModel(undefined, templateEditorMetadata);
    setPipelineTemplateModel({...newPipelineTemplateModel});
  }, []);

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.NEW_TEMPLATE_FLOW_SELECTION_SCREEN:
        return (
          <NewPipelineTemplateWizardFlowSelectionScreen
            setPipelineTemplateWizardScreen={setCurrentScreen}
          />
        );
      case NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.IMPORT_FROM_PIPELINE:
        return (
          <PipelineTemplateManagementWizardImportPipelineSelectionScreen
            pipelineTemplateModel={pipelineTemplateModel}
            setPipelineTemplateModel={setPipelineTemplateModel}
            setPipelineTemplateWizardScreen={setCurrentScreen}
          />
        );
      case NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.PIPELINE_TEMPLATE_EDITOR_PANEL:
      default:
        return (
          <PipelineTemplateEditorPanel
            templateModel={pipelineTemplateModel}
            setTemplateModel={setPipelineTemplateModel}
            handleClose={closePanel}
          />
        );
    }
  };

  if (pipelineTemplateModel == null) {
    return null;
  }

  if (currentScreen === NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.NEW_TEMPLATE_FLOW_SELECTION_SCREEN) {
    return (
      <CenterOverlayContainer
        titleText={`Create New Pipeline Template`}
        closePanel={closePanel}
        size={CENTER_OVERLAY_SIZES.CUSTOM}
        bodyClassName={""}
      >
        <div className={"d-flex"}>
          {getCurrentScreen()}
        </div>
      </CenterOverlayContainer>
    );
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      loadData={loadData}
      titleText={`Create New Pipeline Template`}
      showToasts={true}
    >
      {getCurrentScreen()}
    </FullScreenCenterOverlayContainer>
  );
}

NewPipelineTemplateWizard.propTypes = {
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};
 
export default NewPipelineTemplateWizard;


