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

const ScmToScmMigrationTaskConfigurationEditorPanel = ({
  taskModel,
  taskConfigurationModel,
  setTaskConfigurationModel,
}) => {
  const [scmConfigurationModel, setScmConfigurationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.parseObjectIntoModel(
      taskModel?.getData("configuration"),
      scmToScmMigrationTaskConfigurationMetadata,
    );
    configurationData?.setData("jobType", TASK_TYPES.SCM_TO_SCM_MIGRATION);
    setTaskConfigurationModel({ ...configurationData });
    const newGitModel = modelHelpers.getToolConfigurationModel(
      configurationData?.getData("git"),
      scmToScmMigrationTaskConfigurationMetadata,
    );
    newGitModel?.setData("jobType", TASK_TYPES.SCM_TO_SCM_MIGRATION);
    setScmConfigurationModel({ ...newGitModel });
  };
  return (
    <>
      <Col lg={12}>
        <ScmToScmMigrationTaskMigrationTypeSelectInput
          model={scmConfigurationModel}
          setModel={setScmConfigurationModel}
          fieldName={"migrationType"}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskSourceScmTypeSelectInput
          model={scmConfigurationModel}
          setModel={setScmConfigurationModel}
          fieldName={"sourceScmType"}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskSourceGitToolIdSelectInput
          model={scmConfigurationModel}
          setModel={setScmConfigurationModel}
          toolIdentifier={scmConfigurationModel?.getData("sourceScmType")}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskBitbucketWorkspaceSelectInput
          model={scmConfigurationModel}
          setModel={setScmConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskTargetScmTypeSelectInput
          model={scmConfigurationModel}
          setModel={setScmConfigurationModel}
          fieldName={"targetScmType"}
        />
      </Col>
      <Col lg={12}>
        <ScmToScmMigrationTaskTargetGitToolIdSelectInput
          model={scmConfigurationModel}
          setModel={setScmConfigurationModel}
          toolIdentifier={scmConfigurationModel?.getData("targetScmType")}
        />
      </Col>
    </>
  );
};

ScmToScmMigrationTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default ScmToScmMigrationTaskConfigurationEditorPanel;
