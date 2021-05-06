import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import axios from "axios";
import taskScheduleMetadata from "components/workflow/pipelines/scheduler/schedule/task-schedule-metadata";
import PipelineScheduledTaskFrequencySelectInput from "components/common/list_of_values_input/workflow/scheduler/PipelineScheduledTaskFrequencySelectInput";
import DateInput from "components/common/inputs/date/DateInput";
import TimeInputBase from "components/common/inputs/time/TimeInputBase";
import Model from "core/data_model/model";

function ScheduleEditorPanel({ setSchedulerTaskModel, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [scheduleModel, setScheduleModel] = useState(undefined);
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
    let newModel = newScheduleModel();
    setScheduleModel({...newModel});
    setIsLoading(false);
    console.log(scheduleModel);
  };

  const newScheduleModel= () => {
      let newModel = new Model({...taskScheduleMetadata.newObjectFields}, taskScheduleMetadata, false);
      return newModel;
  };

  return (
    <EditorPanelContainer
      recordDto={scheduleModel}
      setRecordDto={setScheduleModel}
      isLoading={isLoading}
      handleClose={handleClose}
      addAnotherOption={false}
    >
      <Row>
        <Col lg={6}>
          <DateInput setDataObject={setScheduleModel} dataObject={scheduleModel} fieldName={"execution"} />
        </Col>
        <Col lg={6}>
          <PipelineScheduledTaskFrequencySelectInput setDataObject={setScheduleModel} dataObject={scheduleModel} fieldName={"recurring"}/>
        </Col>
        <Col lg={6}>
          <TimeInputBase setDataObject={setScheduleModel} dataObject={scheduleModel} fieldName={"time"} />
        </Col>
        <Col lg={6}>
          HEY
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ScheduleEditorPanel.propTypes = {
  scheduledTaskData: PropTypes.object,
  setSchedulerTaskModel: PropTypes.func,
  handleClose: PropTypes.func
};

export default ScheduleEditorPanel;


