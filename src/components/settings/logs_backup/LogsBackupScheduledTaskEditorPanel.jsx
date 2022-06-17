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
import LogsBackupScheduleEditorPanel from "components/settings/logs_backup/LogsBackupScheduleEditorPanel";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import LogsBackupManagementAwsStorageAccountSelectInput from "./inputs/LogsBackupManagementAwsStorageAccountSelectInput";

function LogsBackupScheduledTaskEditorPanel({ scheduledTaskData, handleClose, taskList, s3ToolId }) {
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

  console.log("schedulerTaskModel.getErrors(): " + JSON.stringify(schedulerTaskModel?.getErrors()));
  console.log("scheduleModel.getErrors(): " + JSON.stringify(scheduleModel?.getErrors()));

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
      disable={
        schedulerTaskModel?.checkCurrentValidity() !== true
        || scheduleModel?.checkCurrentValidity() !== true
      }
    >
      <Row>
        <LogsBackupScheduleEditorPanel
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
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"task.pushToS3Path"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setSchedulerTaskModel} dataObject={schedulerTaskModel} fieldName={"task.s3FileName"}/>
        </Col>
        <Col lg={12}>
          <LogsBackupManagementAwsStorageAccountSelectInput
            s3ToolId={s3ToolId}
            setModel={setSchedulerTaskModel}
            model={schedulerTaskModel}
          />
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

LogsBackupScheduledTaskEditorPanel.propTypes = {
  scheduledTaskData: PropTypes.object,
  handleClose: PropTypes.func,
  taskList: PropTypes.any,
  s3ToolId: PropTypes.string
};

export default LogsBackupScheduledTaskEditorPanel;


