import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import ToolEditorPanel from "components/inventory/tools/tool_details/ToolEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import PipelineScheduledTaskEditorPanel from "components/workflow/pipelines/scheduler/PipelineScheduledTaskEditorPanel";
import pipelineSchedulerMetadata from "components/workflow/pipelines/scheduler/pipeline-scheduler-metadata";
import axios from "axios";
import {faCalendarAlt} from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import pipelineSchedulerActions from "components/workflow/pipelines/scheduler/pipeline-scheduler-actions";
import PipelineScheduledTaskTable from "components/workflow/pipelines/scheduler/PipelineScheduledTaskTable";
import FilterContainer from "components/common/table/FilterContainer";

function PipelineScheduledTasksOverlay({ pipeline }) {
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [scheduledTasksList, setScheduledTasksList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

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
  }, [pipeline]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await loadScheduledTasks(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadScheduledTasks = async (cancelSource = cancelTokenSource) => {

    const response = await pipelineSchedulerActions.getScheduledTasks(getAccessToken, cancelSource, pipeline._id);
    const newScheduledTasksList = response?.data?.data;

    if (isMounted?.current === true && newScheduledTasksList) {
      setScheduledTasksList(newScheduledTasksList);
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      titleText={"Pipeline Scheduled Tasks"}
      closePanel={closePanel}
      titleIcon={faCalendarAlt}
    >
      <PipelineScheduledTaskTable
        isLoading={isLoading}
        data={scheduledTasksList}
        loadData={loadData}
      />
    </CenterOverlayContainer>
  );
}

PipelineScheduledTasksOverlay.propTypes = {
  pipeline: PropTypes.object
};

export default PipelineScheduledTasksOverlay;


