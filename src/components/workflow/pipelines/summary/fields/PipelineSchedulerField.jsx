import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineScheduledTasksOverlay from "components/workflow/pipelines/scheduler/PipelineScheduledTasksOverlay";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import SchedulerFieldBase from "components/common/fields/scheduler/SchedulerFieldBase";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";

const UNSUPPORTED_PIPELINE_TYPES = [
  PIPELINE_TYPES.INFORMATICA,
  PIPELINE_TYPES.MACHINE_LEARNING,
  PIPELINE_TYPES.SALESFORCE
];

function PipelineSchedulerField(
  {
    pipelineModel,
    canEditPipelineSchedule,
    fieldName,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelineTypes, setPipelineTypes] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (pipelineModel) {
      loadData(source).catch((error) => {
        if (isMounted.current === true) {
          setError(error);
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineModel]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const types = pipelineModel?.getArrayData("type");
      setPipelineTypes(types);

      if (Array.isArray(types) && !pipelineTypes.includes("informatica") && !pipelineTypes.includes("sfdc")) {
        await getScheduledTasksCount(cancelSource);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getScheduledTasksCount = async (cancelSource = cancelTokenSource) => {
    const response = await scheduledTaskActions.getScheduledPipelineTasksV2(getAccessToken, cancelSource, pipelineModel?.getMongoDbId());
    const scheduledTasks = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(scheduledTasks)) {
      setTaskCount(scheduledTasks.length);
    }
  };

  const showSchedulerOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineScheduledTasksOverlay
        pipelineId={pipelineModel?.getMongoDbId()}
        loadDataFunction={loadData}
      />
    );
  };

  if (Array.isArray(pipelineTypes) && (pipelineTypes.includes("informatica") || pipelineTypes.includes("sfdc"))) {
    return null;
  }

  return (
    <SchedulerFieldBase
      showSchedulerOverlayFunction={showSchedulerOverlay}
      scheduledTaskCount={taskCount}
      error={error}
      fieldName={fieldName}
      model={pipelineModel}
      canEdit={canEditPipelineSchedule}
      isLoading={isLoading}
      iconSize={"xs"}
    />
  );
}

PipelineSchedulerField.propTypes = {
  canEditPipelineSchedule: PropTypes.bool,
  pipelineModel: PropTypes.object,
  fieldName: PropTypes.string,
};

PipelineSchedulerField.defaultProps = {
  fieldName: "schedule",
};

export default PipelineSchedulerField;