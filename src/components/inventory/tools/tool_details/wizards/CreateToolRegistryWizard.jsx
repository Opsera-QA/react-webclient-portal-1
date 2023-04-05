import React, {useEffect, useState} from "react";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useHistory } from "react-router-dom";
import ToolSetupModeSelect from "./views/ToolSetupModeSelect";
import ToolIdentifierSelectionScreen from "../../create_overlay/ToolIdentifierSelectionScreen";
import Row from "react-bootstrap/Row";
import CancelButton from "../../../../common/buttons/CancelButton";
import useGetNewRegistryToolModel from "../../hooks/useGetNewRegistryToolModel";
import PropTypes from "prop-types";
import LoadingDialog from "../../../../common/status_notifications/loading";
import ToolBasicInfo from "./views/ToolBasicInfo";
import ToolConnectionPanel from "../ToolConnectionPanel";
import ToolConnectionCheck from "./views/ToolConnectionCheck";
import ToolEditorPanel from "../ToolEditorPanel";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

export const REGISTRY_WIZARD_SCREENS = {
  MODE_SELECT: "mode_select",
  TOOL_IDENTIFIER_SELECT: "tool_identifier_select",
  BASIC_TOOL_INFO: "basic_tool_info",
  CONNECTION_INFO: "connection_info",
  CONNECTION_TEST: "connection_test",
  TOOL_DETAIL: "tool_detail"
};

export default function CreateToolRegistryWizard({ loadData }) {
  const [currentScreen, setCurrentScreen] = useState(
    REGISTRY_WIZARD_SCREENS.MODE_SELECT,
  );
  const [buttonContainer, setButtonContainer] = useState(undefined);
  const history = useHistory();
  const [setUpMode, setSetupMode] = useState(undefined);
  const { toolModel, setToolModel } = useGetNewRegistryToolModel();
  const { isMounted, toastContext } = useComponentStateReference();

  const REGISTRY_WIZARD_TITLES = {
    MODE_SELECT: "Step 1: Select Tool Creation Method",
    TOOL_IDENTIFIER_SELECT: "Step 2: Select Tool",
    BASIC_TOOL_INFO: "Step 3: Enter Basic Tool Information",
    CONNECTION_INFO: `Step 4: Configure ${capitalizeFirstLetter(toolModel?.getData("tool_identifier"))} Connection Information`,
    CONNECTION_TEST: `Step 5: Validate ${capitalizeFirstLetter(toolModel?.getData("tool_identifier"))} Connection Information`,
  };
  const [overlayTitle, setOverlayTitle] = useState(REGISTRY_WIZARD_TITLES.MODE_SELECT);

  useEffect(() => {
    switch (currentScreen) {
      case REGISTRY_WIZARD_SCREENS.MODE_SELECT:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.MODE_SELECT);
        return;
      case REGISTRY_WIZARD_SCREENS.TOOL_IDENTIFIER_SELECT:
        if (
          toolModel?.getData("tool_identifier") == null ||
          toolModel?.getData("tool_identifier") === ""
        ) {
          setOverlayTitle(REGISTRY_WIZARD_TITLES.TOOL_IDENTIFIER_SELECT);
          return;
        }
        setOverlayTitle(REGISTRY_WIZARD_TITLES.BASIC_TOOL_INFO);
        return;
      case REGISTRY_WIZARD_SCREENS.CONNECTION_INFO:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.CONNECTION_INFO);
        return;
      case REGISTRY_WIZARD_SCREENS.CONNECTION_TEST:
        setOverlayTitle(REGISTRY_WIZARD_TITLES.CONNECTION_TEST);
        return;
    }
  }, [currentScreen, toolModel?.getData("tool_identifier")]);


  const closeOverlayFunction = () => {
    if (isMounted?.current === true) {
      loadData();
    }
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    history.push(history.location);
  };

  const backButtonFunction = () => {
    if (currentScreen === "tool_identifier_select") {
      setCurrentScreen(REGISTRY_WIZARD_SCREENS.MODE_SELECT);
    }
    if (currentScreen === "connection_test") {
      setCurrentScreen(REGISTRY_WIZARD_SCREENS.CONNECTION_INFO);
    }
  };

  const routeToDetailView = () => {
    closeOverlayFunction();
    history.push(`/inventory/tools/details/${toolModel?.getData("_id")}`);
  };

  const getIdentifierSelectView = () => {
    if (toolModel == null) {
      return (
        <LoadingDialog
          size={"sm"}
          message={"Loading Tool Creation Overlay"}
        />
      );
    }

    const toolIdentifier = toolModel?.getData("tool_identifier");

    if (toolIdentifier == null || toolIdentifier === "") {
      return (
        <div>
          <div className={"full-screen-overlay-panel-body-with-buttons"}>
            <ToolIdentifierSelectionScreen
              toolModel={toolModel}
              setToolModel={setToolModel}
              setButtonContainer={setButtonContainer}
              setCurrentScreen={setCurrentScreen}
              closePanel={closeOverlayFunction}
            />
          </div>
        </div>
      );
    }

    if (setUpMode && setUpMode === "wizard") {
      return (
        <ToolBasicInfo
          setToolData={setToolModel}
          setButtonContainer={setButtonContainer}
          handleClose={closeOverlayFunction}
          toolData={toolModel}
          setCurrentScreen={setCurrentScreen}
        />
      );
    }

    return (
      <ToolEditorPanel
        handleClose={closeOverlayFunction}
        toolData={toolModel}
        setCurrentScreen={setCurrentScreen}
        setButtonContainer={setButtonContainer}
        setToolData={setToolModel}
      />
    );
  };

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case REGISTRY_WIZARD_SCREENS.MODE_SELECT:
        return (
          <ToolSetupModeSelect
            setCurrentScreen={setCurrentScreen}
            closeOverlayFunction={closeOverlayFunction}
            setButtonContainer={setButtonContainer}
            setSetupMode={setSetupMode}
            setupMode={setUpMode}
            className={"py-5"}
          />
        );
      case REGISTRY_WIZARD_SCREENS.TOOL_IDENTIFIER_SELECT:
        return getIdentifierSelectView();
      case REGISTRY_WIZARD_SCREENS.CONNECTION_INFO:
        return (
          <ToolConnectionPanel
            toolData={toolModel}
            setToolData={setToolModel}
            setUpMode={setUpMode}
            setCurrentScreen={setCurrentScreen}
            setButtonContainer={setButtonContainer}
            handleClose={closeOverlayFunction}
          />
        );
      case REGISTRY_WIZARD_SCREENS.CONNECTION_TEST:
        return (
          <ToolConnectionCheck
            toolData={toolModel}
            setButtonContainer={setButtonContainer}
            setCurrentScreen={setCurrentScreen}
            backButtonFunction={backButtonFunction}
            handleClose={closeOverlayFunction}
          />
        );
      case REGISTRY_WIZARD_SCREENS.TOOL_DETAIL:
        return routeToDetailView();
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closeOverlayFunction}
      titleText={overlayTitle}
      buttonContainer={buttonContainer}
      showCloseButton={false}
    >
      {getCurrentScreen()}
    </CenterOverlayContainer>
  );
}

CreateToolRegistryWizard.propTypes = {
  loadData: PropTypes.func,
};
