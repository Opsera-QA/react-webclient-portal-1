import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import JsonField from "components/common/fields/json/JsonField";

function ScmToScmMigrationTaskSummaryCard({ taskConfigurationModel, isLoading }) {
  if (isLoading || taskConfigurationModel == null) {
    return (
      <TaskSummaryCardContainer
        isLoading={isLoading}
      />
    );
  }

  return (
    <TaskSummaryCardContainer isLoading={isLoading}>
      <Row>
      <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"migrationType"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"sourceScmType"}
          />
        </Col>
        <Col xs={6}>
          <ToolNameField
            model={taskConfigurationModel}
            fieldName={"sourceGitToolId"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"sourceWorkspace"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"targetScmType"}
          />
        </Col>
        <Col xs={6}>
          <ToolNameField
            model={taskConfigurationModel}
            fieldName={"targetGitToolId"}
          />
        </Col>
        <Col xs={12}>
          <JsonField dataObject={taskConfigurationModel} fieldName={"repositoryMapList"} />
        </Col>        
      </Row>
    </TaskSummaryCardContainer>
  );
}

ScmToScmMigrationTaskSummaryCard.propTypes = {
  taskConfigurationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ScmToScmMigrationTaskSummaryCard;
