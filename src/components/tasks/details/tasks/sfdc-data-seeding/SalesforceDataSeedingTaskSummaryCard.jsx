import React from "react";
import PropTypes from "prop-types";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import { Row, Col } from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import TextFieldBase from "../../../../common/fields/text/TextFieldBase";

function SalesforceDataSeedingTaskSummaryCard({
  taskConfigDataModel,
  salesforceConfigurationModel,
  isLoading,
}) {
  if (
    isLoading ||
    taskConfigDataModel == null ||
    salesforceConfigurationModel == null
  ) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer isLoading={isLoading}>
      <Row>
        <Col xs={6}>
          <ToolNameField
            model={salesforceConfigurationModel}
            fieldName={"sourceToolId"}
            loadToolInNewWindow={true}
          />
        </Col>
        <Col xs={6}>
          <ToolNameField
            model={salesforceConfigurationModel}
            fieldName={"targetToolId"}
            loadToolInNewWindow={true}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigDataModel}
            fieldName={"action"}
          />
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

SalesforceDataSeedingTaskSummaryCard.propTypes = {
  taskConfigDataModel: PropTypes.object,
  salesforceConfigurationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SalesforceDataSeedingTaskSummaryCard;
