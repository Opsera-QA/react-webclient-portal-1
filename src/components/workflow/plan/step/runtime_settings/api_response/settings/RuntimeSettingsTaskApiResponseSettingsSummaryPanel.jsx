import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import {
  runtimeSettingsTaskApiResponseSettingsMetadata
} from "components/workflow/plan/step/runtime_settings/api_response/settings/runtimeSettingsTaskApiResponseSettings.metadata";

export default function RuntimeSettingsTaskApiResponseSettingsSummaryPanel({ settings }) {
  const runtimeSettingsModel = modelHelpers.parseObjectIntoModel(settings, runtimeSettingsTaskApiResponseSettingsMetadata);

  if (settings == null) {
    return null;
  }

  return (
    <>
      <Col xs={12}>
        <H5FieldSubHeader
          subheaderText={"Requested Runtime Settings"}
          className={"my-2"}
        />
      </Col>
      <Col xs={6}>
        <TextFieldBase
          fieldName={"repository"}
          dataObject={runtimeSettingsModel}
          requireSavedValue={true}
        />
      </Col>
      <Col xs={6}>
        <TextFieldBase
          fieldName={"branch"}
          dataObject={runtimeSettingsModel}
          requireSavedValue={true}
        />
      </Col>
    </>
  );
}

RuntimeSettingsTaskApiResponseSettingsSummaryPanel.propTypes = {
  settings: PropTypes.object,
};
