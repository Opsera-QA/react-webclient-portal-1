import React from "react";
import PropTypes from "prop-types";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function PipelineLinkButton(
  {
    pipelineId,
    loadPipelineInNewWindow,
    closePanelFunction,
  }) {
  const history = useHistory();

  const loadPipeline = () => {
    if (loadPipelineInNewWindow) {
      window.open(`/workflow/details/${pipelineId}/summary`);
    }
    else {
      history.push(`/workflow/details/${pipelineId}/summary`);

      if (closePanelFunction) {
        closePanelFunction();
      }
    }
  };

  return (
    <Button onClick={() => loadPipeline()} className="mb-2" size={"sm"}>
      <span className="my-auto"><IconBase icon={faDraftingCompass} className="pr-1"/>View</span>
    </Button>
  );
}

PipelineLinkButton.propTypes = {
  pipelineId: PropTypes.string,
  loadPipelineInNewWindow: PropTypes.bool,
  closePanelFunction: PropTypes.func
};

export default PipelineLinkButton;
