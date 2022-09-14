import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import PlatformSystemParameterTypeField
  from "components/common/list_of_values_input/admin/platform/system-parameters/PlatformSystemParameterTypeField";

export default function PlatformSystemParameterSummaryPanel(
  { 
    platformSystemParameterModel,
    setActiveTab,
  }) {
  if (platformSystemParameterModel == null) {
    return null;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={platformSystemParameterModel} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <SmartIdField model={platformSystemParameterModel} />
        </Col>
        <Col lg={6}>
          <PlatformSystemParameterTypeField
            model={platformSystemParameterModel}
            fieldName={"type"}
          />
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={platformSystemParameterModel} fieldName={"createdAt"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PlatformSystemParameterSummaryPanel.propTypes = {
  platformSystemParameterModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};
