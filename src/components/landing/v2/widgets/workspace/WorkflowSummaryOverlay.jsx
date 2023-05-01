import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

export default function WorkflowSummaryOverlay({ workflowModel }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (workflowModel == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={workflowModel?.getData("name")}
      titleIcon={faDraftingCompass}
      showToasts={true}
      minimumHeight={"50vh"}
      maximumHeight={"50vh"}
    >
      <div className={"p-3"}>
        {JSON.stringify(workflowModel)}
      </div>
    </CenterOverlayContainer>
  );
}

WorkflowSummaryOverlay.propTypes = {
  workflowModel: PropTypes.object,
};
