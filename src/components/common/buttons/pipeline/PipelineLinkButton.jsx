import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

function PipelineLinkButton({pipelineId, loadPipelineInNewWindow, closePanel}) {
  let history = useHistory();

  const loadPipeline = () => {
    if (loadPipelineInNewWindow) {
      window.open(`/workflow/details/${pipelineId}`);
    }
    else {
      history.push(`/workflow/details/${pipelineId}`);

      if (closePanel) {
        closePanel();
      }
    }
  };

  return (
    <Button onClick={() => loadPipeline()} className="mb-2" size={"sm"}>
      <span className="my-auto"><FontAwesomeIcon icon={faDraftingCompass} className="pr-1" fixedWidth/>View</span>
    </Button>
  );
}

PipelineLinkButton.propTypes = {
  pipelineId: PropTypes.string,
  loadPipelineInNewWindow: PropTypes.bool,
  closePanel: PropTypes.func
};

export default PipelineLinkButton;
