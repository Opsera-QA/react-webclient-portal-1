import React, {useState} from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {Button, Col, Row} from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {cannotBeUndone} from "components/common/tooltip/popover-text";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import LoadingIcon from "components/common/icons/LoadingIcon";

function DestructiveDeleteConfirmationOverlay(
  {
    titleIcon,
    deleteTopic,
    closePanel,
    deleteDetails,
    size,
    handleDeleteFunction
  }) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const getDeleteButtonText = () => {
    if (isDeleting) {
      return <span><LoadingIcon className={"mr-2"} />Deleting...</span>;
    }

    return ("CONFIRM DELETE");
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await handleDeleteFunction();
    }
    finally {
      setIsDeleting(false);
    }
  };


  if (handleDeleteFunction == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Confirm Destructive Delete`}
      titleIcon={titleIcon}
      showToasts={true}
      showCloseButton={false}
      size={size}
    >
      <div className="p-3">
        <Row>
          <Col>
            <div>This is a destructive deletion process. None of the relevant data can be recovered after deletion.</div>
            {deleteDetails}
            <div className="mt-2">If you are absolutely sure you want to delete {deleteTopic}, type &quot;CONFIRM&quot; and click CONFIRM DELETE. </div>
            <div className="mt-2">THIS ACTION CANNOT BE UNDONE.</div>
            <input value={confirmText} className="form-control mt-2" onChange={newText => setConfirmText(newText.target.value)}/>
            <TooltipWrapper innerText={cannotBeUndone}>
              <Button
                className={"mt-2"}
                disabled={confirmText !== "CONFIRM" || isDeleting}
                variant={"danger"}
                onClick={handleDelete}
              >
                {getDeleteButtonText()}
              </Button>
            </TooltipWrapper>
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

DestructiveDeleteConfirmationOverlay.propTypes = {
  deleteTopic: PropTypes.string,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func,
  size: PropTypes.string,
  deleteDetails: PropTypes.any,
  handleDeleteFunction: PropTypes.func,
};

DestructiveDeleteConfirmationOverlay.defaultProps = {
  titleIcon: faTrash,
};

export default DestructiveDeleteConfirmationOverlay;


