import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import PipelineTaskTabPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskTabPanel";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import pipelineActivityActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-actions";
import {AuthContext} from "contexts/AuthContext";
import Model from "core/data_model/model";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

function PipelineTaskDetailViewer({ pipelineActivityLogId, pipelineName }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [pipelineTaskData, setPipelineTaskData] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setPipelineTaskData(undefined);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getPipelineTaskData(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getPipelineTaskData = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActivityActions.getPipelineActivityLogById(getAccessToken, cancelSource, pipelineActivityLogId);
    const pipelineActivityLogData = response?.data?.data;

    if (isMounted?.current === true && pipelineActivityLogData) {
      setPipelineTaskData(new Model(pipelineActivityLogData, response?.data?.metadata, false));
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`[${pipelineName}] Pipeline Task Details`}
      titleIcon={faClipboardList}
      isLoading={isLoading}
    >
      <div className="m-3">
        <PipelineTaskTabPanel pipelineTaskData={pipelineTaskData?.data} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

PipelineTaskDetailViewer.propTypes = {
  pipelineActivityLogId: PropTypes.string,
  pipelineName: PropTypes.string,
};

export default PipelineTaskDetailViewer;