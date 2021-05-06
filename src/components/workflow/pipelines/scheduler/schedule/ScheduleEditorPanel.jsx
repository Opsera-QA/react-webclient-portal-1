import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import PipelineScheduledTaskFrequencySelectInput from "components/common/list_of_values_input/workflow/scheduler/PipelineScheduledTaskFrequencySelectInput";
import taskScheduleMetadata from "components/workflow/pipelines/scheduler/schedule/task-schedule-metadata";
import CalendarInputBase from "components/common/inputs/date/CalendarInputBase";
import modelHelpers from "components/common/model/modelHelpers";

// TODO: Jim, when this is all done and working, I will probably make a component out of the schedule component and hook it up here.
function ScheduleEditorPanel({ scheduledTaskData, scheduleModel, setScheduleModel }) {
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
    const newScheduleModel = modelHelpers.getToolConfigurationModel(scheduledTaskData.getData("schedule"), taskScheduleMetadata);
    setScheduleModel({...newScheduleModel});
    setIsLoading(false);
  };

  if (scheduleModel == null) {
    return null;
  }

  return (
    <Row className={"w-100 mx-0"}>
      <Col lg={6}>
          <CalendarInputBase setDataObject={setScheduleModel} dataObject={scheduleModel} fieldName={"executionDate"}
                             showTimePicker={true}/>
      </Col>
      <Col lg={6}>
        <PipelineScheduledTaskFrequencySelectInput setDataObject={setScheduleModel} dataObject={scheduleModel} fieldName={"recurring"}/>
      </Col>
    </Row>
  );
}

ScheduleEditorPanel.propTypes = {
  scheduledTaskData: PropTypes.object,
  scheduleModel: PropTypes.object,
  setScheduleModel: PropTypes.func,
};

export default ScheduleEditorPanel;


