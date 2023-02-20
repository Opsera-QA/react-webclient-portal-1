import React from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import JsonField from "components/common/fields/json/JsonField";

export default function OrganizationSettingsPoliciesPanel(
  {
    organizationSettingsModel,
  }) {
  if (organizationSettingsModel == null) {
    return null;
  }

  return (
    <Col lg={6}>
      <JsonField
        dataObject={organizationSettingsModel}
        fieldName={"policies"}
      />
    </Col>
  );
}

OrganizationSettingsPoliciesPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
};
