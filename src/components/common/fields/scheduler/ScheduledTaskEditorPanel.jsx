import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ScheduleEditorPanel from "components/workflow/pipelines/scheduler/schedule/ScheduleEditorPanel";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ScheduledTaskEditorPanel({ scheduledTaskData, handleClose, taskList }) {
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

    if (scheduledTaskData?.isNew()) {
      const scheduleCount = taskList?.length ? taskList?.length + 1 : 1;
      scheduledTaskData.setData("name", `Scheduled Task ${scheduleCount}`);
    }

    setSchedulerTaskModel(scheduledTaskData);
    setIsLoading(false);
  };

  const createScheduledTask = async () => {
    schedulerTaskModel.setData("schedule", scheduleModel?.getPersistData());
    const response = await scheduledTaskActions.createScheduledTaskV2(getAccessToken, cancelTokenSource, schedulerTaskModel);
    handleClose();
    return response;
  };

  const updateScheduledTask = async () => {
    schedulerTaskModel.setData("schedule", scheduleModel?.getPersistData());
    const response = await scheduledTaskActions.updateScheduledTaskV2(getAccessToken, cancelTokenSource, schedulerTaskModel);
    handleClose();
    return response;
  };

  const deleteScheduledTask = async () => {
    const response = await scheduledTaskActions.deleteScheduledTaskV2(getAccessToken, cancelTokenSource, schedulerTaskModel.getData("_id"));
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (schedulerTaskModel && !schedulerTaskModel?.isNew()) {
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
          schedulerTaskModel={schedulerTaskModel}
          setSchedulerTaskModel={setSchedulerTaskModel}
        />
         <Col lg={12}>
          <BooleanToggleInput setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"active"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"name"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"description"}/>
          <div>
            <small className="form-text text-muted text-right"> Scheduled dates must be in the future</small>
          </div>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ScheduledTaskEditorPanel.propTypes = {
  scheduledTaskData: PropTypes.object,
  handleClose: PropTypes.func,
  taskList: PropTypes.any,
};

export default ScheduledTaskEditorPanel;


