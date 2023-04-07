import React from "react";
import PropTypes from "prop-types";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import ToolIdentifierSelectionScreen from "components/inventory/tools/create_overlay/ToolIdentifierSelectionScreen";
import CancelButton from "components/common/buttons/CancelButton";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import useGetNewRegistryToolModel from "components/inventory/tools/hooks/useGetNewRegistryToolModel";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

function NewToolOverlay(
  {
    loadData,
    backButtonFunction,
  }) {
  const {
    toolModel,
    setToolModel,
  } = useGetNewRegistryToolModel();
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = (manualClose) => {
    if (manualClose !== false && loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const removeToolIdentifier = () => {
    toolModel?.setData("tool_identifier", "");
    setToolModel({...toolModel});
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
          <ButtonContainerBase
            className={"pt-2 px-2"}
            leftSideButtons={
              <BackButtonBase
                backButtonFunction={backButtonFunction}
              />
            }
          >
            <CancelButton
              size={"md"}
              className={"mb-2"}
              cancelFunction={closePanel}
            />
          </ButtonContainerBase>
        </div>
      );
    }

    return (
      <ToolEditorPanel
        setToolData={setToolModel}
        handleClose={closePanel}
        toolData={toolModel}
        backButtonFunction={removeToolIdentifier}
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
  backButtonFunction: PropTypes.func,
};

export default NewToolOverlay;


