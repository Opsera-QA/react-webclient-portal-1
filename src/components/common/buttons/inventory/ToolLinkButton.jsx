import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

function ToolLinkButton({toolId, loadToolInNewWindow}) {
  let history = useHistory();

  const loadTool = () => {
    if (loadToolInNewWindow) {
      window.open(`/inventory/tools/details/${toolId}`);
    }
    else {
      history.push(`/inventory/tools/details/${toolId}`);
    }
  };

  return (
    <Button onClick={() => loadTool()} className="mb-2" size={"sm"}>
      <span className="small my-auto"><FontAwesomeIcon icon={faTools} className="pr-1" fixedWidth/>View Tool</span>
    </Button>
  );
}

ToolLinkButton.propTypes = {
  toolId: PropTypes.string,
  loadToolInNewWindow: PropTypes.bool
};

export default ToolLinkButton;
