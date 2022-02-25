import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import JsonField from "components/common/fields/json/JsonField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import BooleanField from "components/common/fields/boolean/BooleanField";
import ActivityField from "components/common/fields/boolean/ActivityField";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import ImageField from "components/common/fields/image/ImageField";
import AccessRuleField from "components/common/inputs/access_rules/field/AccessRuleField";

function KpiIdentifierSummaryPanel({ kpiData, setActiveTab }) {
  if (kpiData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={kpiData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={kpiData} fieldName={"active"} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={kpiData} fieldName={"policySupport"} />
        </Col>
        <Col lg={6}>
          <SmartIdField model={kpiData} fieldName={"_id"} />
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={kpiData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kpiData} fieldName={"type"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kpiData} fieldName={"yAxis"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={kpiData} fieldName={"description"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={kpiData} fieldName={"identifier"} />
        </Col>
        <Col lg={12}>
          <GenericItemField dataObject={kpiData} fieldName={"tools"} />
        </Col>
        <Col lg={12}>
          <GenericItemField dataObject={kpiData} fieldName={"category"} />
        </Col>
        <Col lg={12}>
          <ImageField
            model={kpiData}
            fieldName={"thumbnailPath"}
            imageTitle={"KPI Identifier Image"}
          />
        </Col>
        <Col lg={4}>
          <JsonField dataObject={kpiData} fieldName={"supported_filters"} />
        </Col>
        <Col lg={4}>
          <JsonField dataObject={kpiData} fieldName={"dataPoints"} />
        </Col>
        <Col lg={4}>
          <JsonField dataObject={kpiData} fieldName={"settings"} />
        </Col>
        <Col lg={12} className={"mt-3"}>
          <AccessRuleField
            rules={kpiData?.getData("accessRules")}
            model={kpiData}
            fieldName={"accessRules"}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

KpiIdentifierSummaryPanel.propTypes = {
  kpiData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default KpiIdentifierSummaryPanel;
