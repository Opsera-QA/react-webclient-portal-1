import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";

function PipelineLinkButton({pipelineId}) {
  return (
    <Button onClick={() => window.open(`/workflow/details/${pipelineId}`)} className="mb-2" size={"sm"}>
      <span className="small my-auto"><FontAwesomeIcon icon={faDraftingCompass} className="pr-1" fixedWidth/>View Pipeline</span>
    </Button>
  );
}

PipelineLinkButton.propTypes = {
  pipelineId: PropTypes.string
};


export default PipelineLinkButton;
