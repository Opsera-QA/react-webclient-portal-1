import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

// TODO: Rewrite, this was mostly kept intact from the original code
export default function NotificationActivityLogOverlay({activityLog}) {
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanelFunction = () => {
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanelFunction}
      titleText={"Notification Activity Log"}
    >
      <div className="m-3">
        <ReactJson src={activityLog} displayDataTypes={false}/>
      </div>
    </CenterOverlayContainer>
  );
}

NotificationActivityLogOverlay.propTypes = {
  activityLog: PropTypes.object,
};
