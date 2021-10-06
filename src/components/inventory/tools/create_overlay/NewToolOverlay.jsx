import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ToolIdentifierSelectionScreen from "components/inventory/tools/create_overlay/ToolIdentifierSelectionScreen";
import Row from "react-bootstrap/Row";
import CancelButton from "components/common/buttons/CancelButton";

function NewToolOverlay({ loadData, isMounted, toolMetadata }) {
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(new Model({...toolMetadata.newObjectFields}, toolMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getView = () => {
    const toolIdentifier = toolData?.getData("tool_identifier");

    if (toolIdentifier == null || toolIdentifier === "") {
      return (
        <div>
          <div className={"full-screen-overlay-panel-body-with-buttons"}>
            <ToolIdentifierSelectionScreen
              toolModel={toolData}
              setToolModel={setToolData}
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
        setToolData={setToolData}
        handleClose={closePanel}
        toolData={toolData}
      />
    );
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={toolMetadata?.type}
      loadData={loadData}
      showCloseButton={true}
    >
      {getView()}
    </CreateCenterPanel>
  );
}

NewToolOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  toolMetadata: PropTypes.object,
};

export default NewToolOverlay;


