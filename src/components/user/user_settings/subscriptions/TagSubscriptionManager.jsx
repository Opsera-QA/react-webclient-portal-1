import React, {useContext} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import AllTagsCloud from "components/common/fields/tags/cloud/AllTagsCloud";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CloseButton from "components/common/buttons/CloseButton";

function TagSubscriptionManager({loadData, isMounted}) {
  const toastContext = useContext(DialogToastContext);
  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer titleIcon={faTag}  closePanel={closePanel} titleText={"Tag Subscription Manager"} showPanel={true}>
      <div className={"p-3 shaded-panel"}>
        <div className="mb-4">Click a Tag to manage subscription status.</div>
        <AllTagsCloud />
        <SaveButtonContainer>
          <CloseButton className={"mr-2"} size={"sm"} closeEditorCallback={closePanel} />
        </SaveButtonContainer>
      </div>
    </CenterOverlayContainer>
  );
}

TagSubscriptionManager.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object
};

export default TagSubscriptionManager;
