import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import FieldContainer from "components/common/fields/FieldContainer";
import IconBase from "components/common/icons/IconBase";
import {faBinoculars, faPencilAlt} from "@fortawesome/pro-light-svg-icons";
import PipelineScheduledTasksOverlay from "components/workflow/pipelines/scheduler/PipelineScheduledTasksOverlay";
import pipelineSchedulerActions from "components/workflow/pipelines/scheduler/pipeline-scheduler-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import FieldLabel from "components/common/fields/FieldLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

function PipelineSchedulerField(
  {
    pipelineModel,
    canEditPipelineSchedule,
    fieldName,
  }) {
  const [field] = useState(pipelineModel?.getFieldById(fieldName));
  const { getAccessToken } = useContext(AuthContext);
  const [pipelineTypes, setPipelineTypes] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
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
      setError(undefined);
      setPipelineTypes(pipelineModel?.getArrayData("type"));
      await getScheduledTasksCount(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const getScheduledTasksCount = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineSchedulerActions.getScheduledTasks(getAccessToken, cancelSource, pipelineModel?.getMongoDbId());
    const scheduledTasks = response?.data?.data;

    if (isMounted?.current === true  && Array.isArray(scheduledTasks)) {
      setTaskCount(scheduledTasks.length);
    }
  };

  const toastContext = useContext(DialogToastContext);

  const getTaskCountText = () => {
    if (taskCount === 0) {
      return "No scheduled tasks";
    }

    const taskLabel = taskCount === 1 ? "task" : "tasks";

    return `${taskCount} ${taskLabel} scheduled`;
  };

  const showSchedulerOverlay = () => {
    toastContext.showOverlayPanel(
      <PipelineScheduledTasksOverlay
        pipelineId={pipelineModel?.getMongoDbId()}
      />
    );
  };

  // TODO: Tighten up
  const getScheduleIcon = () => {
    if (canEditPipelineSchedule !== true) {
      return null;
    }

    if (taskCount > 0){
      return (
        <IconBase
          icon={faBinoculars}
          className={"ml-2 text-muted pointer"}
          iconSize={"sm"}
          onClickFunction={() => {
            showSchedulerOverlay();
          }} />
      );
    }

    return (
      <IconBase
        icon={faPencilAlt}
        className={"ml-2 text-muted pointer"}
        iconSize={"xs"}
        iconTransformProperties={"shrink-6"}
        onClickFunction={() => {
          showSchedulerOverlay();
        }} />
    );
  };

  if (field == null || Array.isArray(pipelineTypes) && (pipelineTypes.includes("informatica") || pipelineTypes.includes("sfdc"))) {
    return null;
  }

  return (
    <FieldContainer>
      <FieldLabel field={field} fieldName={fieldName} />
      {getTaskCountText()}
      {getScheduleIcon()}
      <InfoText fieldName={fieldName} field={field} errorMessage={error} />
    </FieldContainer>
  );
}

PipelineSchedulerField.propTypes = {
  pipelineTypes: PropTypes.array,
  canEditPipelineSchedule: PropTypes.bool,
  pipeline: PropTypes.object,
  pipelineModel: PropTypes.object,
  fieldName: PropTypes.string,
};

PipelineSchedulerField.defaultProps = {
  fieldName: "schedule",
};

export default PipelineSchedulerField;