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
  mergeSyncTaskSalesforceConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/mergeSyncTaskSalesforceConfiguration.metadata";
import SalesforceMergeSyncTaskSalesforceToolSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceMergeSyncTaskSalesforceToolSelectInput";
import SalesforceToGitMergeSyncTaskTargetBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskTargetBranchSelectInput";
import SalesforceToGitMergeSyncTaskSourceControlTypeSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskSourceControlTypeSelectInput";
import {
  mergeSyncTaskGitConfigurationMetadata
} from "components/tasks/details/tasks/merge_sync_task/git_to_git/mergeSyncTaskGitConfiguration.metadata";
import SalesforceToGitMergeSyncTaskSourceControlToolSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskSourceControlToolSelectInput";
import SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput";
import SalesforceToGitMergeSyncTaskRepositorySelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskRepositorySelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput";
import SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput";

function SalesforceToGitMergeSyncTaskConfigurationEditorPanel(
  {
    taskModel,
    taskConfigurationModel,
    setTaskConfigurationModel,
  }) {
  const [salesforceConfigurationModel, setSalesforceConfigurationModel] = useState(undefined);
  const [gitConfigurationModel, setGitConfigurationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      taskModel?.getData("configuration"),
      mergeSyncTaskConfigurationMetadata,
    );
    configurationData?.setData("jobType", TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC);
    setTaskConfigurationModel({ ...configurationData });
    const newSalesforceSyncModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("sfdc"),
      mergeSyncTaskSalesforceConfigurationMetadata,
    );
    newSalesforceSyncModel?.setData("jobType", TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC);
    setSalesforceConfigurationModel({...newSalesforceSyncModel});
    const newGitSyncModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("git"),
      mergeSyncTaskGitConfigurationMetadata,
    );
    newGitSyncModel?.setData("jobType", TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC);
    setGitConfigurationModel({...newGitSyncModel});
  };

  const setModelFunction = (newModel) => {
    setSalesforceConfigurationModel({...newModel});
    taskConfigurationModel?.setData("git", gitConfigurationModel?.getPersistData());
    taskConfigurationModel?.setData("sfdc", salesforceConfigurationModel?.getPersistData());
    setTaskConfigurationModel({...taskConfigurationModel});
  };

  const getDestinationBranchInputs = () => {
    if (gitConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput
              model={gitConfigurationModel}
              setModel={setModelFunction}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={gitConfigurationModel}
              setDataObject={setModelFunction}
              fieldName={"targetBranch"}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskTargetBranchSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
    );
  };

  if (taskModel == null || taskConfigurationModel == null || salesforceConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <SalesforceMergeSyncTaskSalesforceToolSelectInput
          model={salesforceConfigurationModel}
          setModel={setModelFunction}
          fieldName={"sourceToolId"}
        />
      </Col>
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskSourceControlTypeSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskSourceControlToolSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
          toolIdentifier={gitConfigurationModel?.getData("service")}
        />
      </Col>
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskRepositorySelectInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput
          model={gitConfigurationModel}
          setModel={setModelFunction}
        />
      </Col>
      {getDestinationBranchInputs()}
    </Row>
  );
}

SalesforceToGitMergeSyncTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceToGitMergeSyncTaskConfigurationEditorPanel;
