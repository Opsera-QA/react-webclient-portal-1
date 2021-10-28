import React from "react";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import FieldSubHeader from "components/common/fields/FieldSubHeader";
import SalesforceLogSummarySuccessfulComponentsTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/components/SalesforceLogSummarySuccessfulComponentsTable";
import SalesforceLogSummaryUnsuccessfulComponentsTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/components/SalesforceLogSummaryUnsuccessfulComponentsTable";

function SalesforceLogSummaryComponentResultsSummaryPanel({ salesforceDeployResultsModel }) {
  const getSuccessfulComponents = () => {
    const data = salesforceDeployResultsModel?.getPersistData();
    return data?.details?.componentSuccesses || [];
  };

  const getFailureComponents = () => {
    const data = salesforceDeployResultsModel?.getPersistData();
    return data?.details?.componentFailures || [];
  };

  return (
    <SummaryPanelContainer className={"step-configuration-summary mt-3 mx-3"}>
      <Row>
        <Col lg={12}>
          <FieldSubHeader subheaderText={"Component Details"} />
        </Col>
        <Col lg={4}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentsTotal"}/>
        </Col>
        <Col lg={4}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentsDeployed"}/>
        </Col>
        <Col lg={4}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentErrors"}/>
        </Col>
        <Col lg={12}>
          <SalesforceLogSummarySuccessfulComponentsTable
            successfulComponents={getSuccessfulComponents()}
            hasFailureComponents={getFailureComponents()?.length > 0}
          />
        </Col>
        <Col lg={12}>
          <SalesforceLogSummaryUnsuccessfulComponentsTable
            unsuccessfulComponents={getFailureComponents()}
            hasSuccessfulComponents={getSuccessfulComponents()?.length > 0}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}


SalesforceLogSummaryComponentResultsSummaryPanel.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryComponentResultsSummaryPanel;