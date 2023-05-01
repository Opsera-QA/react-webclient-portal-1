import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass, faSearch} from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";

export default function WorkflowSummaryOverlay({ workflowModel }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();

  const handleViewDetailsButton = () => {
    history.push(workflowModel?.getDetailViewLink());
    closePanel();
  };

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
      showCloseButton={false}
      minimumHeight={"50vh"}
      maximumHeight={"50vh"}
    >
      <div className={"p-3"}>
        {JSON.stringify(workflowModel)}
        <ButtonContainerBase>
          <VanityButtonBase
            onClickFunction={handleViewDetailsButton}
            normalText={"View Details"}
            icon={faSearch}
          />
          <CloseButton
            className={"ml-2"}
            closeEditorCallback={closePanel}
          />
        </ButtonContainerBase>
      </div>
    </CenterOverlayContainer>
  );
}

WorkflowSummaryOverlay.propTypes = {
  workflowModel: PropTypes.object,
};
