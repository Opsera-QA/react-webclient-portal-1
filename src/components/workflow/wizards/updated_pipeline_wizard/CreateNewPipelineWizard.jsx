import React, {useEffect, useState} from "react";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useHistory } from "react-router-dom";
import TemplateTypeSelectInput from "./templates/TemplateTypeSelectInput";
import PropTypes from "prop-types";
import WizardCatalogLibrary from "./templates/WizardCatalogLibrary";
import CenterLoadingIndicator from "../../../common/loading/CenterLoadingIndicator";
import DeployBlankPipeline from "./templates/DeployBlankPipeline";

export const CREATE_PIPELINE_WIZARD_SCREENS = {
  TEMPLATE_TYPE_SELECT: "mode_select",
  TEMPLATE_SELECT: "template_select",
  LOADING_SCREEN: "loading_screen",
  BLANK_PIPELINE: "blank_pipeline",
  CONNECTION_INFO: "connection_info",
  CONNECTION_TEST: "connection_test",
  TOOL_DETAIL: "tool_detail",
};

export default function CreateNewPipelineWizard({
  loadData,
  backButtonFunction,
}) {
  const [currentScreen, setCurrentScreen] = useState(
    CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_TYPE_SELECT,
  );
  const [buttonContainer, setButtonContainer] = useState(undefined);
  const history = useHistory();
  const [setUpMode, setSetupMode] = useState(undefined);
  const { isMounted, toastContext } = useComponentStateReference();

  const REGISTRY_WIZARD_TITLES = {
    TEMPLATE_TYPE_SELECT: "Step 1: Select Pipeline Creation Template",
    TEMPLATE_SELECT: "Step 2: Select Template",
    LOADING_SCREEN: "Step 3: Creating Pipeline",
    BLANK_PIPELINE: "Step 3: Creating Pipeline",
    CONNECTION_INFO: `Step 4: Configure Connection Information`,
    CONNECTION_TEST: `Step 5: Validate Connection Information`,
  };
  const [overlayTitle, setOverlayTitle] = useState(
    REGISTRY_WIZARD_TITLES.TEMPLATE_TYPE_SELECT,
  );

  useEffect(() => {
    switch (currentScreen) {
      case CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_TYPE_SELECT:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.TEMPLATE_TYPE_SELECT);
        return;
      case CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_SELECT:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.TEMPLATE_SELECT);
        return;
      case CREATE_PIPELINE_WIZARD_SCREENS.LOADING_SCREEN:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.LOADING_SCREEN);
        return;
      case CREATE_PIPELINE_WIZARD_SCREENS.BLANK_PIPELINE:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.BLANK_PIPELINE);
        return;
      case CREATE_PIPELINE_WIZARD_SCREENS.CONNECTION_TEST:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.CONNECTION_TEST);
        return;
    }
  }, [currentScreen]);

  const closeOverlayFunction = () => {
    if (isMounted?.current === true) {
      loadData();
    }
    toastContext?.removeInlineMessage();
    toastContext?.clearOverlayPanel();
    history.push(history.location);
  };

  const handleBackButtonFunction = () => {
    if (currentScreen === "template_select") {
      setCurrentScreen(CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_TYPE_SELECT);
    }
    if (currentScreen === "connection_test") {
      setCurrentScreen(CREATE_PIPELINE_WIZARD_SCREENS.CONNECTION_INFO);
    }
  };

  const routeToDetailView = () => {
    closeOverlayFunction();
    history.push(`/inventory/tools/details/`);
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_TYPE_SELECT:
        return (
          <TemplateTypeSelectInput
            setCurrentScreen={setCurrentScreen}
            closeOverlayFunction={closeOverlayFunction}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            setSetupMode={setSetupMode}
            setupMode={setUpMode}
            className={"py-5"}
          />
        );
      case CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_SELECT:
        return (
          <WizardCatalogLibrary
            setupMode={setUpMode}
            backButtonFunction={() =>
              setCurrentScreen(CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_TYPE_SELECT)
            }
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_PIPELINE_WIZARD_SCREENS.BLANK_PIPELINE:
        return (
          <DeployBlankPipeline
            backButtonFunction={() =>
              setCurrentScreen(CREATE_PIPELINE_WIZARD_SCREENS.TEMPLATE_TYPE_SELECT)
            }
            setButtonContainer={setButtonContainer}
          />
        );
      case CREATE_PIPELINE_WIZARD_SCREENS.LOADING_SCREEN:
        return (
            <CenterLoadingIndicator
                type={"Pipeline"}
            />
        );
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closeOverlayFunction}
      titleText={overlayTitle}
      buttonContainer={buttonContainer}
      showToasts={true}
    >
      {getCurrentScreen()}
    </CenterOverlayContainer>
  );
}

CreateNewPipelineWizard.propTypes = {
  loadData: PropTypes.func,
  backButtonFunction: PropTypes.func,
};
