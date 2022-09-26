import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

export default function ToolJsonOverlay({ toolModel }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (toolModel == null) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Registry Tool JSON Viewer`}
      titleIcon={faCode}
    >
      <StandaloneJsonField
        titleText={"JSON View"}
        className={"p-3"}
        json={toolModel?.getCurrentData()}
        enableClipboard={true}
        exportFileName={`${toolModel.getData("name")}-${new Date()}`}
      />
    </FullScreenCenterOverlayContainer>
  );
}

ToolJsonOverlay.propTypes = {
  toolModel: PropTypes.object
};