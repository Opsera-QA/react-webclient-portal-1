import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import BooleanField from "components/common/fields/boolean/BooleanField";
import FieldSubHeader from "components/common/fields/FieldSubHeader";

function SalesforceLogSummaryOverviewSummaryPanel({ salesforceDeployResultsModel }) {
  if (salesforceDeployResultsModel == null) {
    return <LoadingDialog message={"Loading Pipeline"} size={'sm'} />;
  }

  const getComponentOverview = () => {
    if (salesforceDeployResultsModel?.getData("numberComponentsTotal") === 0) {
      return (
        <Row className={"my-3"}>
          <Col lg={12}><FieldSubHeader subheaderText={"Component Overview"} /></Col>
          <Col lg={12} className={"my-2"}>This execution did not include Components</Col>
        </Row>
      );
    }

    return (
      <Row className={"my-3"}>
        <Col lg={12}><FieldSubHeader subheaderText={"Component Overview"} /></Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentsTotal"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentsDeployed"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberComponentErrors"}/>
        </Col>
      </Row>
    );
  };

  const getUnitTestOverview = () => {
    if (salesforceDeployResultsModel?.getData("numberTestsTotal") === 0) {
      return (
        <Row className={"my-3"}>
          <Col lg={12}><FieldSubHeader subheaderText={"Unit Test Overview"} /></Col>
          <Col lg={12} className={"my-2"}>This execution did not include Unit Testing</Col>
        </Row>
      );
    }

    return (
      <Row className={"my-3"}>
        <Col lg={12}><FieldSubHeader subheaderText={"Unit Test Overview"} /></Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestsTotal"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestsCompleted"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestErrors"}/>
        </Col>
      </Row>
    );
  };


  // TODO: Make individual cards for each part
  return (
    <SummaryPanelContainer className={"step-configuration-summary mx-3 mt-3"}>
      <Row>
        <Col lg={12}><FieldSubHeader subheaderText={"Execution Overview"} /></Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"id"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"status"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"createdByName"} />
        </Col>
        {/*<Col lg={6}>*/}
        {/*  <DateTimeField dataObject={salesforceDeployResultsModel} fieldName={"startDate"} />*/}
        {/*</Col>*/}
        {/*<Col lg={6}>*/}
        {/*  <DateTimeField dataObject={salesforceDeployResultsModel} fieldName={"completedDate"} />*/}
        {/*</Col>*/}
        <Col lg={6}>
          <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"done"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"checkOnly"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"success"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"retrieveResult"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={salesforceDeployResultsModel} fieldName={"rollbackOnError"}/>
        </Col>
      </Row>
      {getComponentOverview()}
      {getUnitTestOverview()}
    </SummaryPanelContainer>
  );
}


SalesforceLogSummaryOverviewSummaryPanel.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryOverviewSummaryPanel;