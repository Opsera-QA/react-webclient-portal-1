import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import JsonField from "components/common/fields/json/JsonField";

// TODO: Make viewer fields for policies, entitlements, and features as needed
export default function OrganizationSettingsSummaryPanel(
  {
    organizationSettingsModel,
  }) {
  if (organizationSettingsModel == null) {
    return null;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <SmartIdField
            model={organizationSettingsModel}
          />
        </Col>
        <Col lg={6}>
          <ActivityField
            dataObject={organizationSettingsModel}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={organizationSettingsModel}
            fieldName={"organizationAccountId"}
            showClipboardButton={true}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={organizationSettingsModel}
            fieldName={"organizationDomain"}
            showClipboardButton={true}
          />
        </Col>
        <Col lg={6}>
          <JsonField
            dataObject={organizationSettingsModel}
            fieldName={"features"}
          />
        </Col>
        <Col lg={6}>
          <JsonField
            dataObject={organizationSettingsModel}
            fieldName={"entitlement"}
          />
        </Col>
        <Col lg={6}>
          <JsonField
            dataObject={organizationSettingsModel}
            fieldName={"policies"}
          />
        </Col>
        <Col lg={6}>
          <JsonField
            dataObject={organizationSettingsModel}
            fieldName={"parameters"}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

OrganizationSettingsSummaryPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
};
