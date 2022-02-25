import React, {useContext} from "react";
import PropTypes from "prop-types";
import ActionBarTransferPipelineButton from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarTransferPipelineButton";
import ActionBarPublishPipelineButton from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarPublishPipelineButton";
import PipelineSubscriptionIcon from "components/common/icons/subscription/PipelineSubscriptionIcon";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelinesSummaryHelpDocumentation from "components/common/help/documentation/pipelines/PipelinesSummaryHelpDocumentation";
import ActionBarDuplicatePipelineButton
  from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarDuplicatePipelineButton";
import ActionBarDeletePipelineButton from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarDeletePipelineButton";
import ActionBarShowPipelineSummaryOverlayButton
  from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarShowPipelineSummaryOverlayButton";

function PipelineSummaryActionBar({pipelineModel, isActionAllowedFunction, pipeline, loadPipeline}) {
  const toastContext = useContext(DialogToastContext);

  const toggleHelp = () => {
    toastContext.showOverlayPanel(<PipelinesSummaryHelpDocumentation />);
  };

  return (
    <div className={"text-muted action-bar justify-content-end d-flex pb-2 pt-2"}>
      <PipelineSubscriptionIcon
        pipelineId={pipeline?._id}
        className={"ml-3"}
      />
      <ActionBarShowPipelineSummaryOverlayButton
        pipeline={pipeline}
        isActionAllowedFunction={isActionAllowedFunction}
      />
      <ActionBarPublishPipelineButton
        isActionAllowedFunction={isActionAllowedFunction}
        pipeline={pipeline}
      />
      <ActionBarDuplicatePipelineButton
        pipeline={pipeline}
        isActionAllowedFunction={isActionAllowedFunction}
      />
      <ActionBarTransferPipelineButton
        loadPipeline={loadPipeline}
        pipeline={pipeline}
        isActionAllowedFunction={isActionAllowedFunction}
      />
      <ActionBarToggleHelpButton
        className={"ml-3 action-bar-icon pointer"}
        toggleHelp={toggleHelp}
      />
      <ActionBarDeletePipelineButton
        pipeline={pipeline}
        isActionAllowedFunction={isActionAllowedFunction}
      />
    </div>
  );
}

PipelineSummaryActionBar.propTypes = {
  isActionAllowedFunction: PropTypes.func,
  loadPipeline: PropTypes.func,
  pipeline: PropTypes.object,
  pipelineModel: PropTypes.object
};

export default PipelineSummaryActionBar;