import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

function ToolLinkButton({toolId, loadToolInNewWindow, className, variant, closePanel}) {
  let history = useHistory();

  const loadTool = () => {
    if (loadToolInNewWindow) {
      window.open(`/inventory/tools/details/${toolId}`);
    }
    else {
      history.push(`/inventory/tools/details/${toolId}`);

      if (closePanel) {
        closePanel();
      }
    }
  };

  return (
    <Button onClick={() => loadTool()} className={className ? className : "mb-2 small"} size={"sm"} variant={variant}>
      <span className="my-auto"><FontAwesomeIcon icon={faTools} className="mr-2" fixedWidth/>View</span>
    </Button>
  );
}

ToolLinkButton.propTypes = {
  toolId: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  loadToolInNewWindow: PropTypes.bool,
  closePanel: PropTypes.func
};

export default ToolLinkButton;
