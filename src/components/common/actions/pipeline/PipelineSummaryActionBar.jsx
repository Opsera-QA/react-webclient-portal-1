import React, { useState } from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButton from "../buttons/ActionBarDeleteButton";
import ActionBarDuplicateButton from "../buttons/ActionBarDuplicateButton";
import ActionBarTransferPipelineButton from "./buttons/ActionBarTransferPipelineButton";
import ActionBarViewButton from "../buttons/ActionBarViewButton";
import ActionBarPublishPipelineButton from "./buttons/ActionBarPublishPipelineButton";

function PipelineSummaryActionBar({handlePipelineTransferClick, handleDuplicateClick, handleDeleteClick, handleViewClick, handlePublishClick, pipeline}) {
  return (
    <div className="text-muted action-bar justify-content-between d-flex pb-2">
      {handleViewClick && <div className="ml-3"><ActionBarViewButton handleViewClick={handleViewClick} itemName={"Pipeline"} data={pipeline} /></div>}
      {handlePublishClick && <div className="ml-3"><ActionBarPublishPipelineButton handlePublishClick={handlePublishClick} itemId={pipeline._id} /></div>}
      {handleDuplicateClick && <div className="ml-3"><ActionBarDuplicateButton handleDuplicateClick={handleDuplicateClick} itemName={"Pipeline"} itemId={pipeline._id} /></div>}
      {handlePipelineTransferClick && <div className="ml-3"><ActionBarTransferPipelineButton pipeline={pipeline} transferPipeline={handlePipelineTransferClick} itemId={pipeline._id} /></div>}
      {handleDeleteClick && <div className="ml-3"><ActionBarDeleteButton handleDeleteClick={handleDeleteClick} itemName={"Pipeline"}  /></div>}
    </div>
  );
}

PipelineSummaryActionBar.propTypes = {
  handleDeleteClick: PropTypes.func,
  handleDuplicateClick: PropTypes.func,
  handlePipelineTransferClick: PropTypes.func,
  handleViewClick: PropTypes.func,
  handlePublishClick: PropTypes.func,
  pipeline: PropTypes.object,
};

export default PipelineSummaryActionBar;