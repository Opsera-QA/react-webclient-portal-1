import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import {Row, Col} from "react-bootstrap";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import BooleanField from "components/common/fields/boolean/BooleanField";

function SalesforceToGitMergeSyncTaskSummaryCard(
  {
    gitConfigurationModel,
    salesforceConfigurationModel,
    isLoading,
  }) {
  if (isLoading || gitConfigurationModel == null) {
    return (
      <TaskSummaryCardContainer
        isLoading={isLoading}
      />
    );
  }

  const getDestinationBranchFields = () => {
    if (gitConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col xs={6}>
            <TextFieldBase
              dataObject={gitConfigurationModel}
              fieldName={"upstreamBranch"}
            />
          </Col>
          <Col xs={6}>
            <TextFieldBase
              dataObject={gitConfigurationModel}
              fieldName={"targetBranch"}
            />
          </Col>
        </>
      );
    }

    return (
      <Col xs={6}>
        <TextFieldBase
          dataObject={gitConfigurationModel}
          fieldName={"targetBranch"}
        />
      </Col>
    );
  };

  return (
    <TaskSummaryCardContainer isLoading={isLoading}>
      <Row>
        <Col xs={12}>
          <ToolNameField
            model={salesforceConfigurationModel}
            fieldName={"sourceToolId"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={gitConfigurationModel}
            fieldName={"service"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={gitConfigurationModel}
            fieldName={"gitUrl"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={gitConfigurationModel}
            fieldName={"repository"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={gitConfigurationModel}
            fieldName={"workspace"}
            visible={gitConfigurationModel?.getData("service") === "bitbucket"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={gitConfigurationModel}
            fieldName={"sourceBranch"}
          />
        </Col>
        <Col xs={6}>
          <BooleanField
            dataObject={gitConfigurationModel}
            fieldName={"isNewBranch"}
          />
        </Col>
        {getDestinationBranchFields()}
        <Col xs={6}>
          <BooleanField
            dataObject={salesforceConfigurationModel}
            fieldName={"includePackageXml"}
          />
        </Col>
        <Col xs={6}>
          <TextFieldBase
            dataObject={salesforceConfigurationModel}
            fieldName={"sourceBranch"}
            visible={salesforceConfigurationModel?.getData("packageXmlReferencePath") === true}
          />
        </Col>
      </Row>
    </TaskSummaryCardContainer>
  );
}

SalesforceToGitMergeSyncTaskSummaryCard.propTypes = {
  gitConfigurationModel: PropTypes.object,
  salesforceConfigurationModel: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SalesforceToGitMergeSyncTaskSummaryCard;
