import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import BooleanField from "components/common/fields/boolean/BooleanField";

function SnaplogicTaskSummaryCard({ taskConfigurationModel, isLoading }) {
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
          <ToolNameField
            model={taskConfigurationModel}
            fieldName={"toolConfigId"}
          />
        </Col>
        <Col xs={6}>
          <ToolNameField
            model={taskConfigurationModel}
            fieldName={"gitToolId"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"service"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"gitUrl"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"repository"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"workspace"}
            visible={taskConfigurationModel?.getData("service") === "bitbucket"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"gitBranch"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"projectSpace"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"project"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"validationURL"}
          />
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

SnaplogicTaskSummaryCard.propTypes = {
  taskConfigurationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SnaplogicTaskSummaryCard;
