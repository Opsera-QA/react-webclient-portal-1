import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/tooltipWrapper";
import {unsavedChanges} from "components/common/tooltip/popover-text";

function CloseButton({ isLoading, closeEditorCallback }) {
  return (
    <div className="mx-1">
      <TooltipWrapper innerText={unsavedChanges}>
        <Button size="md" variant="secondary" disabled={isLoading} onClick={() => closeEditorCallback()}>
          <span><FontAwesomeIcon icon={faTimes} className="mr-1" fixedWidth/>Close</span>
        </Button>
      </TooltipWrapper>
    </div>
  );
}

CloseButton.propTypes = {
  closeEditorCallback: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CloseButton;