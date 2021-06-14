import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {unsavedChanges} from "components/common/tooltip/popover-text";

function CloseButton({ isLoading, closeEditorCallback, size, className, showUnsavedChangesMessage }) {
  if (closeEditorCallback == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={showUnsavedChangesMessage ? unsavedChanges : undefined}>
        <Button size={size} variant="secondary" disabled={isLoading} onClick={() => closeEditorCallback()}>
          <span><FontAwesomeIcon icon={faTimes} className="mr-1" fixedWidth/>Close</span>
        </Button>
      </TooltipWrapper>
    </div>
  );
}

CloseButton.propTypes = {
  closeEditorCallback: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  showUnsavedChangesMessage: PropTypes.bool
};

CloseButton.defaultProps = {
  size: "md",
  showUnsavedChangesMessage: true
};

export default CloseButton;