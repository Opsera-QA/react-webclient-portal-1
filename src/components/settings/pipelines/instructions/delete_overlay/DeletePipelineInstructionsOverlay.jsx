import React from "react";
import PropTypes from "prop-types";
import DestructiveDeleteConfirmationOverlay
  from "components/common/overlays/center/delete/DestructiveDeleteConfirmationOverlay";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useGetPipelinesByPipelineInstructionsUsage
  from "components/common/list_of_values_input/settings/pipelines/instructions/usage/useGetPipelinesByPipelineInstructionsUsage";
import PipelineUsageFieldBase from "components/common/list_of_values_input/pipelines/usage/PipelineUsageFieldBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { pipelineInstructionsHelper } from "components/settings/pipelines/instructions/pipelineInstructions.helper";
import { useHistory } from "react-router-dom";

export default function DeletePipelineInstructionsOverlay(
  {
    pipelineInstructionsModel,
  }) {
  const history = useHistory();
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    pipelines,
    isLoading,
    error,
    loadData,
  } = useGetPipelinesByPipelineInstructionsUsage(pipelineInstructionsModel?.getMongoDbId());


  const handleDeleteFunction = async () => {
    try {
      await pipelineInstructionsModel.deleteModel();
      toastContext.showDeleteSuccessResultDialog("Pipeline Instructions");
      history.push(pipelineInstructionsHelper.getManagementScreenLink());
      closePanel();
    } catch (error) {
      toastContext.showDeleteFailureResultDialog("Pipeline Instructions", error);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDeleteDetails = () => {
    return (
      <div className="mt-2">
        <div>
          <span>If you proceed with deleting this set of Pipeline Instructions, the data will be permanently lost and these Pipelines using this set of Pipeline Instructions will break:</span>
        </div>
        <div>
          <PipelineUsageFieldBase
            isLoading={isLoading}
            pipelines={pipelines}
            type={"set of Pipeline Instructions"}
            error={error}
            loadPipelinesFunction={loadData}
            closePanel={closePanel}
          />
        </div>
      </div>
    );
  };

  if (isMongoDbId(pipelineInstructionsModel?.getMongoDbId()) !== true || pipelineInstructionsModel?.canDelete() !== true) {
    return null;
  }

  return (
    <DestructiveDeleteConfirmationOverlay
      closePanel={closePanel}
      deleteTopic={"Pipeline Instructions"}
      handleDeleteFunction={handleDeleteFunction}
      deleteDetails={getDeleteDetails()}
    />
  );
}

DeletePipelineInstructionsOverlay.propTypes = {
  pipelineInstructionsModel: PropTypes.object,
};

