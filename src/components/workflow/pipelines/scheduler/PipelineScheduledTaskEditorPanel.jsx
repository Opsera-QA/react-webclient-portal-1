import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import pipelineSchedulerActions from "components/workflow/pipelines/scheduler/pipeline-scheduler-actions";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ScheduleEditorPanel from "components/workflow/pipelines/scheduler/schedule/ScheduleEditorPanel";
import CheckboxInput from "components/common/inputs/boolean/CheckboxInput";

function PipelineScheduledTaskEditorPanel({ scheduledTaskData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [schedulerTaskModel, setSchedulerTaskModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [scheduleModel, setScheduleModel] = useState(undefined);

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
    setSchedulerTaskModel(scheduledTaskData);
    setIsLoading(false);
  };

  const createScheduledTask = async () => {
    let data = scheduleModel?.data;
    schedulerTaskModel.setData("schedule", { recurring: data?.recurring, executionDate: data?.executionDate});
    schedulerTaskModel.setData("active", data.active);
    return await pipelineSchedulerActions.createSchedule(getAccessToken, cancelTokenSource, schedulerTaskModel);
  };

  const updateScheduledTask = async () => {
    let data = scheduleModel?.data;
    schedulerTaskModel.setData("schedule", { recurring: data?.recurring, executionDate: data?.executionDate}, "active", data.active);
    schedulerTaskModel.setData("active", data.active);
    return await pipelineSchedulerActions.updateSchedule(getAccessToken, cancelTokenSource, schedulerTaskModel);
  };

  const deleteScheduledTask = async () => {
    return await pipelineSchedulerActions.deleteScheduledTask(getAccessToken, cancelTokenSource, schedulerTaskModel.getData("_id"));
  };

  const getExtraButtons = () => {
    if (!scheduledTaskData.isNew()) {
      return (
        <DeleteButtonWithInlineConfirmation dataObject={scheduledTaskData} deleteRecord={deleteScheduledTask}/>
      );
    }
  };

  return (
    <EditorPanelContainer
      recordDto={schedulerTaskModel}
      createRecord={createScheduledTask}
      updateRecord={updateScheduledTask}
      setRecordDto={setSchedulerTaskModel}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      addAnotherOption={false}
      disable={scheduleModel == null || !scheduleModel.checkCurrentValidity()}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"notes"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"description"}/>
        </Col>
        <ScheduleEditorPanel
          scheduledTaskData={scheduledTaskData}
          setScheduleModel={setScheduleModel}
          scheduleModel={scheduleModel}
        />
      </Row>
    </EditorPanelContainer>
  );
}

PipelineScheduledTaskEditorPanel.propTypes = {
  scheduledTaskData: PropTypes.object,
  setSchedulerTaskModel: PropTypes.func,
  handleClose: PropTypes.func
};

export default PipelineScheduledTaskEditorPanel;


