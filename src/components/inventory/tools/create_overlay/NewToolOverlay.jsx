import React from "react";
import PropTypes from "prop-types";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ToolIdentifierSelectionScreen from "components/inventory/tools/create_overlay/ToolIdentifierSelectionScreen";
import Row from "react-bootstrap/Row";
import CancelButton from "components/common/buttons/CancelButton";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import useGetNewRegistryToolModel from "components/inventory/tools/hooks/useGetNewRegistryToolModel";

function NewToolOverlay({ loadData }) {
  const {
    toolModel,
    setToolModel,
  } = useGetNewRegistryToolModel();
  const {
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getView = () => {
    if (toolModel == null) {
      return (<LoadingDialog size={"sm"} message={"Loading Tool Creation Overlay"} />);
    }

    const toolIdentifier = toolModel?.getData("tool_identifier");

    if (toolIdentifier == null || toolIdentifier === "") {
      return (
        <div>
          <div className={"full-screen-overlay-panel-body-with-buttons"}>
            <ToolIdentifierSelectionScreen
              toolModel={toolModel}
              setToolModel={setToolModel}
              closePanel={closePanel}
            />
          </div>
          <Row className={"mx-0"}>
            <div className={"ml-auto"}>
              <CancelButton size={"md"} className={"mx-2 mb-2"} cancelFunction={closePanel} />
            </div>
          </Row>
        </div>
      );
    }

    return (
      <ToolEditorPanel
        setToolData={setToolModel}
        handleClose={closePanel}
        toolData={toolModel}
      />
    );
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={registryToolMetadata?.type}
      loadData={loadData}
      showCloseButton={true}
    >
      {getView()}
    </CreateCenterPanel>
  );
}

NewToolOverlay.propTypes = {
  loadData: PropTypes.func,
};

export default NewToolOverlay;


