import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

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
        <StandaloneJsonField json={activityLog} displayDataTypes={false}/>
      </div>
    </CenterOverlayContainer>
  );
}

NotificationActivityLogOverlay.propTypes = {
  activityLog: PropTypes.object,
};
