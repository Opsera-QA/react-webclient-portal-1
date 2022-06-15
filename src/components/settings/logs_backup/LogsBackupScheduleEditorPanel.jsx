import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import taskScheduleMetadata from "components/workflow/pipelines/scheduler/schedule/task-schedule-metadata";
import ScheduleCalendarInput from "components/workflow/pipelines/scheduler/schedule/ScheduleCalendarInput";
import modelHelpers from "components/common/model/modelHelpers";
import ScheduleTimeInput from "components/workflow/pipelines/scheduler/schedule/ScheduleTimeInput";
import LogsBackupScheduleFrequencyRadioInput
  from "components/settings/logs_backup/inputs/LogsBackupScheduleFrequencyRadioInput";

// TODO: Jim, when this is all done and working, I will probably make a component out of the schedule component and hook it up here.
function LogsBackupScheduleEditorPanel(
  {
    scheduledTaskData,
    scheduleModel,
    setScheduleModel,
    setSchedulerTaskModel,
  }) {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const newScheduleModel = modelHelpers.getToolConfigurationModel(
      scheduledTaskData.getData("schedule"),
      taskScheduleMetadata,
    );
    setScheduleModel({ ...newScheduleModel });
    setIsLoading(false);
  };

  const updateModel = (newDataModel) => {
    setScheduleModel(newDataModel);

    scheduledTaskData.setData("schedule", scheduleModel?.getPersistData());
    setSchedulerTaskModel({ ...scheduledTaskData });
  };

  if (scheduleModel == null) {
    return null;
  }

  return (
    <Row className={"w-100 mx-0"}>
      <Col lg={4}>
        <ScheduleCalendarInput
          setDataObject={updateModel}
          dataObject={scheduleModel}
          fieldName={"executionDate"}
          scheduledTaskData={scheduledTaskData}
        />
      </Col>
      <Col lg={4}>
        <ScheduleTimeInput
          setDataObject={updateModel}
          dataObject={scheduleModel}
          fieldName={"executionDate"}
        />
      </Col>
      <Col lg={4}>
        <LogsBackupScheduleFrequencyRadioInput
          setDataObject={updateModel}
          dataObject={scheduleModel}
          fieldName={"recurring"}
        />
      </Col>
    </Row>
  );
}

LogsBackupScheduleEditorPanel.propTypes = {
  scheduledTaskData: PropTypes.object,
  scheduleModel: PropTypes.object,
  setScheduleModel: PropTypes.func,
  setSchedulerTaskModel: PropTypes.func,
};

export default LogsBackupScheduleEditorPanel;
