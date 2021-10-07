import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ToolIdentifierSelectionScreen from "components/inventory/tools/create_overlay/ToolIdentifierSelectionScreen";
import Row from "react-bootstrap/Row";
import CancelButton from "components/common/buttons/CancelButton";
import ToolModel from "components/inventory/tools/tool.model";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";

function NewToolOverlay({ loadData, isMounted, toolMetadata }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    createNewToolModel(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
    };
  }, []);

  const createNewToolModel = async (cancelSource = cancelTokenSource) => {
    try {
      const accessRoleData = await getAccessRoleData();
      const newTool = new ToolModel({...toolMetadata.newObjectFields}, toolMetadata, true, getAccessToken, cancelSource, accessRoleData, loadData, [], setToolData);
      setToolData(newTool);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getView = () => {
    if (toolData == null) {
      return (<LoadingDialog size={"sm"} message={"Loading Tool Creation Overlay"} />);
    }

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


