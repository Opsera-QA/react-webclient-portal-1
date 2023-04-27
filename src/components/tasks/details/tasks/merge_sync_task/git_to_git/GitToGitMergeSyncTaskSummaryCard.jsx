import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import ArrayToTextField from "components/common/fields/text/ArrayToTextField";

function GitToGitMergeSyncTaskSummaryCard({ taskConfigurationModel, isLoading }) {
  if (isLoading || taskConfigurationModel == null) {
    return (
      <TaskSummaryCardContainer
        isLoading={isLoading}
      />
    );
  }

  const getDestinationBranchFields = () => {
    if (taskConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col xs={6}>
            <TextFieldBase
              dataObject={taskConfigurationModel}
              fieldName={"upstreamBranch"}
            />
          </Col>
          <Col xs={6}>
            <TextFieldBase
              dataObject={taskConfigurationModel}
              fieldName={"targetBranch"}
            />
          </Col>
        </>
      );
    }

    return (
      <Col xs={6}>
        <TextFieldBase
          dataObject={taskConfigurationModel}
          fieldName={"targetBranch"}
        />
      </Col>
    );
  };

  const getJiraFields = () => {
    if (taskConfigurationModel?.getData("isSalesforce") !== true) {
      return null;
    }
    return (
      <>
        <Col xs={6}>
          <ToolNameField
            model={taskConfigurationModel}
            fieldName={"jiraToolId"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"jiraProjectKey"}            
          />
        </Col>
        <Col xs={6}>
          <ArrayToTextField
            model={taskConfigurationModel}
            fieldName={"jiraIssueIds"}
          />
        </Col>
      </>
    );
  };

  return (
    <TaskSummaryCardContainer isLoading={isLoading}>
      <Row>
        <Col xs={12}>
          <ToolNameField
            model={taskConfigurationModel}
            fieldName={"toolId"}
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
        {taskConfigurationModel?.getData("service") === "bitbucket" && 
          <Col xs={6}>
            <TextFieldBase
              dataObject={taskConfigurationModel}
              fieldName={"workspace"}
              visible={taskConfigurationModel?.getData("service") === "bitbucket"}
            />
          </Col>
        }        
        <Col xs={6}>
          <TextFieldBase
            dataObject={taskConfigurationModel}
            fieldName={"sourceBranch"}
          />
        </Col>
        <Col xs={6}>
          <BooleanField
            dataObject={taskConfigurationModel}
            fieldName={"isNewBranch"}
          />
        </Col>
        {getDestinationBranchFields()}
        {getJiraFields()}
      </Row>
    </TaskSummaryCardContainer>
  );
}

GitToGitMergeSyncTaskSummaryCard.propTypes = {
  taskConfigurationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default GitToGitMergeSyncTaskSummaryCard;
