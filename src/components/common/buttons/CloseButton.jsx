import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CloseButton({ isLoading, closeEditorCallback }) {

  return (
    <div className="mx-1">
      <Button size="sm" variant="secondary" disabled={isLoading} onClick={() => closeEditorCallback()}>
        <span><FontAwesomeIcon icon={faTimes} className="mr-1" fixedWidth/>Close</span>
      </Button>
    </div>
  );
}

CloseButton.propTypes = {
  closeEditorCallback: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CloseButton;