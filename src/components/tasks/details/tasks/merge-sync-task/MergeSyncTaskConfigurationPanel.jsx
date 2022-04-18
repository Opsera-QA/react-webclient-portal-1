import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MergeSyncTaskMergeTypeSelectInput
  from "components/tasks/details/tasks/merge-sync-task/inputs/MergeSyncTaskMergeTypeSelectInput";
import {
  mergeSyncTaskConfigurationMetadata
} from "components/tasks/details/tasks/merge-sync-task/mergeSyncTaskConfiguration.metadata";
import {
  MERGE_SYNC_TASK_JOB_TYPES
} from "components/common/list_of_values_input/tasks/type/merge_sync_task/mergeSyncTaskJob.types";
import GitToGitMergeSyncTaskConfigurationEditorPanel
  from "components/tasks/details/tasks/merge-sync-task/git-to-git/GitToGitMergeSyncTaskConfigurationEditorPanel";

function MergeSyncTaskConfigurationPanel({ taskModel, taskConfigurationModel, setTaskConfigurationModel }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const newConfigurationModel = modelHelpers.getToolConfigurationModel(taskModel.getData("configuration"), mergeSyncTaskConfigurationMetadata);
    setTaskConfigurationModel({...newConfigurationModel});
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicPanel = () => {
    switch (taskConfigurationModel?.getData("jobType")){
      case MERGE_SYNC_TASK_JOB_TYPES.GIT_VS_GIT_SYNC:
      return (
        <GitToGitMergeSyncTaskConfigurationEditorPanel
          taskModel={taskModel}
          taskConfigurationModel={taskConfigurationModel}
          setTaskConfigurationModel={setTaskConfigurationModel}
        />
      );
      case MERGE_SYNC_TASK_JOB_TYPES.SFDC_GIT_COMPARE_SYNC:
        // return (
        //   <GitToGitMergeSyncTaskConfigurationEditorPanel
        //     taskModel={taskModel}
        //     taskConfigurationModel={taskConfigurationModel}
        //     setTaskConfigurationModel={setTaskConfigurationModel}
        //   />
        // );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <MergeSyncTaskMergeTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        {getDynamicPanel()}
      </Col>
    </Row>
  );
}

MergeSyncTaskConfigurationPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default MergeSyncTaskConfigurationPanel;


