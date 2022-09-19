import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import BooleanField from "components/common/fields/boolean/BooleanField";

export default function PlatformSettingsSummaryPanel(
  {
    platformSettingsModel,
    setActiveTab,
  }) {
  if (platformSettingsModel == null) {
    return null;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={platformSettingsModel} fieldName={"platformId"}/>
        </Col>
        <Col lg={6}>
          <SmartIdField model={platformSettingsModel} />
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={platformSettingsModel} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={platformSettingsModel} fieldName={"createdAt"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PlatformSettingsSummaryPanel.propTypes = {
  platformSettingsModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};
