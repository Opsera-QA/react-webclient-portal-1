import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import PipelineScheduledTasksOverlay from "components/workflow/pipelines/scheduler/PipelineScheduledTasksOverlay";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import SchedulerFieldBase from "components/common/fields/scheduler/SchedulerFieldBase";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineSchedulerField(
  {
    pipelineModel,
    canEditPipelineSchedule,
    fieldName,
  }) {
  const [pipelineTypes, setPipelineTypes] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
    isFreeTrial,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    if (pipelineModel && isMongoDbId(pipelineModel?.getMongoDbId())) {
      loadData().catch((error) => {
        if (isMounted.current === true) {
          setError(error);
        }
      });
    }
  }, [pipelineModel]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      const types = pipelineModel?.getArrayData("type");
      setPipelineTypes(types);

      if (Array.isArray(types) && !pipelineTypes.includes("informatica") && !pipelineTypes.includes("sfdc")) {
        await getScheduledTasksCount();
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

  const getScheduledTasksCount = async () => {
    const response = await scheduledTaskActions.getScheduledPipelineTasksV2(getAccessToken, cancelTokenSource, pipelineModel?.getMongoDbId());
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

  if (
    (isFreeTrial === true && isOpseraAdministrator !== true)
    || (Array.isArray(pipelineTypes)
    && (pipelineTypes.includes(PIPELINE_TYPES.INFORMATICA) || pipelineTypes.includes(PIPELINE_TYPES.SALESFORCE) || pipelineTypes.includes(PIPELINE_TYPES.APIGEE)) )
    ) {
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