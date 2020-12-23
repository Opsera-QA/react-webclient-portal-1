import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";

function PipelineLinkButton({pipelineId, loadPipelineInNewWindow}) {
  let history = useHistory();

  const loadPipeline = () => {
    if (loadPipelineInNewWindow) {
      window.open(`/workflow/details/${pipelineId}`);
    }

    history.push(`/workflow/details/${pipelineId}`);
  };

  return (
    <Button onClick={() => loadPipeline()} className="mb-2" size={"sm"}>
      <span className="small my-auto"><FontAwesomeIcon icon={faDraftingCompass} className="pr-1" fixedWidth/>View Pipeline</span>
    </Button>
  );
}

PipelineLinkButton.propTypes = {
  pipelineId: PropTypes.string,
  loadPipelineInNewWindow: PropTypes.bool
};


export default PipelineLinkButton;
