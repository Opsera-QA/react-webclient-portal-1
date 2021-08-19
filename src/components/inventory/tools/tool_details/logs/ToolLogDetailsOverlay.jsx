import React, {useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import ReactJson from "react-json-view";

function ToolLogDetailsOverlay({ toolData, toolLogData, isLoading }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Tool Details Log`}
      titleIcon={faTable}
      showToasts={true}
      isLoading={isLoading}
    >
      <div className={"p-3"}>
        <ReactJson src={toolLogData} displayDataTypes={false} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

ToolLogDetailsOverlay.propTypes = {
  toolLogData: PropTypes.object,
  toolData: PropTypes.object,
  isLoading: PropTypes.bool
};

export default ToolLogDetailsOverlay;


