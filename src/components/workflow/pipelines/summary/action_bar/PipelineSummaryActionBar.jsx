import React, {useContext} from "react";
import PropTypes from "prop-types";
import ActionBarTransferPipelineButton from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarTransferPipelineButton";
import PipelineSubscriptionIcon from "components/common/icons/subscription/PipelineSubscriptionIcon";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelinesSummaryHelpDocumentation from "components/common/help/documentation/pipelines/PipelinesSummaryHelpDocumentation";
import ActionBarDuplicatePipelineButton
  from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarDuplicatePipelineButton";
import ActionBarDeletePipelineButton from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarDeletePipelineButton";
import ActionBarShowPipelineSummaryOverlayButton
  from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarShowPipelineSummaryOverlayButton";
import ActionBarPublishPipelineToCustomerCatalogButton
  from "components/workflow/pipelines/summary/action_bar/buttons/publish/ActionBarPublishPipelineToCustomerCatalogButton";
import ActionBarPublishPipelineButton
  from "components/workflow/pipelines/summary/action_bar/buttons/ActionBarPublishPipelineButton";

function PipelineSummaryActionBar({pipelineModel, pipeline, loadPipeline}) {
  const toastContext = useContext(DialogToastContext);

  const toggleHelp = () => {
    toastContext.showOverlayPanel(<PipelinesSummaryHelpDocumentation />);
  };

  return (
    <div className={"text-muted action-bar justify-content-end d-flex pb-2 pt-2"}>
      <PipelineSubscriptionIcon
        pipelineModel={pipelineModel}
        pipelineId={pipeline?._id}
        pullSubscriptionStatus={true}
        className={"ml-3"}
      />
      <ActionBarShowPipelineSummaryOverlayButton
        pipeline={pipeline}
      />
      <ActionBarPublishPipelineToCustomerCatalogButton
        pipelineModel={pipelineModel}
        className={"ml-3"}
      />
      <ActionBarDuplicatePipelineButton
        pipeline={pipeline}
      />
      <ActionBarTransferPipelineButton
        loadPipeline={loadPipeline}
        pipeline={pipeline}
      />
      <ActionBarToggleHelpButton
        className={"ml-3 action-bar-icon pointer"}
        toggleHelp={toggleHelp}
      />
      <ActionBarDeletePipelineButton
        className={"ml-3"}
        pipeline={pipeline}
      />
    </div>
  );
}

PipelineSummaryActionBar.propTypes = {
  loadPipeline: PropTypes.func,
  pipeline: PropTypes.object,
  pipelineModel: PropTypes.object
};

export default PipelineSummaryActionBar;