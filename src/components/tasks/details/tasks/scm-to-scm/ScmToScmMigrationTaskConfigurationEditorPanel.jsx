import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScmToScmMigrationTaskMigrationTypeSelectInput from "./inputs/ScmToScmMigrationTaskMigrationTypeSelectInput";
import { scmToScmMigrationTaskConfigurationMetadata } from "components/tasks/details/tasks/scm-to-scm/scmToScmMigrationTaskConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";

import { TASK_TYPES } from "components/tasks/task.types";
import ScmToScmMigrationTaskSourceScmTypeSelectInput from "./inputs/ScmToScmMigrationTaskSourceScmTypeSelectInput";
import ScmToScmMigrationTaskSourceGitToolIdSelectInput from "./inputs/ScmToScmMigrationTaskSourceGitToolIdSelectInput";
import ScmToScmMigrationTaskBitbucketWorkspaceSelectInput from "./inputs/ScmToScmMigrationTaskBitbucketWorkspaceSelectInput";
import ScmToScmMigrationTaskTargetScmTypeSelectInput from "./inputs/ScmToScmMigrationTaskTargetScmTypeSelectInput";
import ScmToScmMigrationTaskTargetGitToolIdSelectInput from "./inputs/ScmToScmMigrationTaskTargetGitToolIdSelectInput";
import ScmToScmMigrationRepositoryMappingInput from "./inputs/ScmToScmMigrationRepositoryMappingInput";

const ScmToScmMigrationTaskConfigurationEditorPanel = ({
  taskModel,
  taskConfigurationModel,
  setTaskConfigurationModel,
}) => {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      taskModel.getData("configuration"),
      scmToScmMigrationTaskConfigurationMetadata,
    );
    configurationData?.setData("jobType", TASK_TYPES.SCM_TO_SCM_MIGRATION);
    setTaskConfigurationModel({ ...configurationData });
  };

  if (!taskConfigurationModel) {
    return null;
  }

  return (
    <Row>
      <Col lg={12}>
        <ScmToScmMigrationTaskMigrationTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          fieldName={"migrationType"}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskSourceScmTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          fieldName={"sourceScmType"}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskSourceGitToolIdSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          toolIdentifier={taskConfigurationModel?.getData("sourceScmType")}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskBitbucketWorkspaceSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskTargetScmTypeSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          fieldName={"targetScmType"}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskTargetGitToolIdSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          toolIdentifier={taskConfigurationModel?.getData("targetScmType")}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationRepositoryMappingInput 
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
          fieldName={"repositoryMapList"}
          type={"Repository Mappings"}
          allowIncompleteItems={false}
        />
      </Col>
    </Row>
  );
};

ScmToScmMigrationTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default ScmToScmMigrationTaskConfigurationEditorPanel;
