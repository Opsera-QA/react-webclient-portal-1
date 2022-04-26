import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  mergeSyncTaskConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/mergeSyncTaskConfiguration.metadata";
import { TASK_TYPES } from "components/tasks/task.types";
import {
  salesforceToGitMergeSyncTaskConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/salesforceToGitMergeSyncTaskConfiguration.metadata";

function SalesforceToGitMergeSyncTaskConfigurationEditorPanel({
  taskModel,
  taskConfigurationModel,
  setTaskConfigurationModel,
}) {
  const [salesforceConfigurationModel, setSalesforceConfigurationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      taskModel?.getData("configuration"),
      mergeSyncTaskConfigurationMetadata,
    );
    setTaskConfigurationModel({ ...configurationData });
    const newGitModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("git"),
      salesforceToGitMergeSyncTaskConfigurationMetadata,
    );
    newGitModel?.setData("jobType", TASK_TYPES.GIT_TO_GIT_MERGE_SYNC);
    setSalesforceConfigurationModel({...newGitModel});
  };

  const setModelFunction = (newModel) => {
    setSalesforceConfigurationModel({...newModel});
    taskConfigurationModel?.setData("git", salesforceConfigurationModel?.getPersistData());
    setTaskConfigurationModel({...taskConfigurationModel});
  };

  if (taskModel == null || taskConfigurationModel == null || salesforceConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
      </Col>
      <Col lg={12}>
      </Col>
    </Row>
  );
}

SalesforceToGitMergeSyncTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceToGitMergeSyncTaskConfigurationEditorPanel;
