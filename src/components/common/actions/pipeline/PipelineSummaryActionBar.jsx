import React, {useContext} from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButton from "../buttons/ActionBarDeleteButton";
import ActionBarDuplicateButton from "../buttons/ActionBarDuplicateButton";
import ActionBarTransferPipelineButton from "./buttons/ActionBarTransferPipelineButton";
import ActionBarViewButton from "../buttons/ActionBarViewButton";
import ActionBarPublishPipelineButton from "./buttons/ActionBarPublishPipelineButton";
import PipelineSubscriptionIcon from "components/common/icons/subscription/PipelineSubscriptionIcon";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelinesHelpDocumentation from "components/common/help/documentation/pipelines/PipelinesHelpDocumentation";

function PipelineSummaryActionBar({pipelineModel, canTransferPipeline, handleDuplicateClick, handleDeleteClick, handleViewClick, handlePublishClick, pipeline, loadPipeline}) {
  const toastContext = useContext(DialogToastContext);

  const toggleHelp = () => {
    toastContext.showOverlayPanel(<PipelinesHelpDocumentation />);
  };

  return (
    <div className="text-muted action-bar justify-content-end d-flex pb-2 pt-2">
      <div className="ml-3"><PipelineSubscriptionIcon pipelineId={pipeline?._id} /></div>
      {handleViewClick && <div className="ml-3"><ActionBarViewButton handleViewClick={handleViewClick} itemName={"Pipeline"} data={pipeline} /></div>}
      {handlePublishClick && <div className="ml-3"><ActionBarPublishPipelineButton handlePublishClick={handlePublishClick} itemId={pipeline._id} /></div>}
      {handleDuplicateClick && <div className="ml-3"><ActionBarDuplicateButton handleDuplicateClick={handleDuplicateClick} itemName={"Pipeline"} itemId={pipeline._id} /></div>}
      {canTransferPipeline && pipeline.account != null && <div className="ml-3"><ActionBarTransferPipelineButton loadPipeline={loadPipeline} pipeline={pipeline} itemId={pipeline._id} /></div>}
      {/*<ActionBarToggleHelpButton className={"ml-3 action-bar-icon pointer"} toggleHelp={toggleHelp} />*/}
      {handleDeleteClick && <div className="ml-3"><ActionBarDeleteButton handleDeleteClick={handleDeleteClick} itemId={pipeline._id} itemName={"Pipeline"} /></div>}
    </div>
  );
}

PipelineSummaryActionBar.propTypes = {
  handleDeleteClick: PropTypes.func,
  handleDuplicateClick: PropTypes.func,
  loadPipeline: PropTypes.func,
  canTransferPipeline: PropTypes.bool,
  handleViewClick: PropTypes.func,
  handlePublishClick: PropTypes.func,
  handleEditAccessRolesClick: PropTypes.func,
  pipeline: PropTypes.object,
  pipelineModel: PropTypes.object
};

export default PipelineSummaryActionBar;