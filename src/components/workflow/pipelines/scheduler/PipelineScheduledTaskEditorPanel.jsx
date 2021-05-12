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
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function PipelineScheduledTaskEditorPanel({ scheduledTaskData, handleClose, pipeline, taskList }) {
  const { getAccessToken } = useContext(AuthContext);
  const [schedulerTaskModel, setSchedulerTaskModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [scheduleModel, setScheduleModel] = useState(undefined);
  let isNew = true;

  const frequencyLookup ={
    "NONE": "once",
    "DAY": "daily",
    "WEEK": "weekly",
    "MONTH": "monthly"
};

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
    schedulerTaskModel.setData("schedule", scheduleModel?.getPersistData());
    const response = await pipelineSchedulerActions.createSchedule(getAccessToken, cancelTokenSource, schedulerTaskModel);
    handleClose();
    return response;
  };

  const updateScheduledTask = async () => {
    schedulerTaskModel.setData("schedule", scheduleModel?.getPersistData());
    const response = await pipelineSchedulerActions.updateSchedule(getAccessToken, cancelTokenSource, schedulerTaskModel);
    handleClose();
    return response;
  };

  const deleteScheduledTask = async () => {
    const response = await pipelineSchedulerActions.deleteScheduledTask(getAccessToken, cancelTokenSource, schedulerTaskModel.getData("_id"));
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (!scheduledTaskData.isNew()) {
      isNew = false;
      return (
        <DeleteButtonWithInlineConfirmation dataObject={scheduledTaskData} deleteRecord={deleteScheduledTask}/>
      );
    }
  };

  const updateScheduleName = (dataObject, date) => {
      if(isNew){
          // let updatedDate = date ? date : dataObject.data.executionDate;
          // let info = dataObject.data.recurring == "NONE" ? "on" : "starting on"; 
          // scheduledTaskData.setData("name", `Run ${pipeline?.name} ${frequencyLookup[dataObject.data.recurring]} ${info} ${updatedDate.toLocaleString()}`);
          let scheduleCount = taskList.length;
          scheduledTaskData.setData("name", `Pipeline Schedule ${scheduleCount}`);
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
      disable={ schedulerTaskModel == null
        || !schedulerTaskModel.checkCurrentValidity()
        || scheduleModel == null
        || !scheduleModel.checkCurrentValidity()
      }
    >
      <Row>
        <ScheduleEditorPanel
          scheduledTaskData={scheduledTaskData}
          setScheduleModel={setScheduleModel}
          scheduleModel={scheduleModel}
          isNew={isNew}
          pipeline={pipeline}
          updateScheduleName={updateScheduleName}
        />
         <Col lg={12}>
          <BooleanToggleInput setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"active"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"name"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"description"}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

PipelineScheduledTaskEditorPanel.propTypes = {
  scheduledTaskData: PropTypes.object,
  setSchedulerTaskModel: PropTypes.func,
  handleClose: PropTypes.func,
  pipeline: PropTypes.object,
  taskList: PropTypes.any,
};

export default PipelineScheduledTaskEditorPanel;


