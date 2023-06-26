import React, {useEffect} from "react";
import PropTypes from "prop-types";
import PipelineTaskTabPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskTabPanel";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useGetPipelineActivityLogModelById from "hooks/workflow/pipelines/logs/useGetPipelineActivityLogModelById";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {errorHelpers} from "components/common/helpers/error-helpers";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export default function PipelineActivityLogDetailViewOverlay({ pipelineActivityLogId, pipelineName }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    pipelineActivityLogModel,
    isLoading,
    error,
  } = useGetPipelineActivityLogModelById(pipelineActivityLogId);

  useEffect(() => {}, []);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator

        />
      );
    }

    if (error) {
      return (
        <CenteredContentWrapper>
          <ErrorMessageFieldBase
            message={errorHelpers.parseApiErrorForInfoText("Pipeline Activity Log", error)}
          />
        </CenteredContentWrapper>
      );
    }

    return (
      <PipelineTaskTabPanel
        pipelineTaskData={pipelineActivityLogModel?.getCurrentData()}
      />
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`${pipelineName} Pipeline Task Details`}
      titleIcon={faClipboardList}
      isLoading={isLoading}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineActivityLogDetailViewOverlay.propTypes = {
  pipelineActivityLogId: PropTypes.string,
  pipelineName: PropTypes.string,
};
