import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import {
  runtimeSettingsTaskApiResponseMetadata
} from "components/workflow/plan/step/runtime_settings/api_response/runtimeSettingsTaskApiResponse.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RuntimeSettingsTaskApiResponseSettingsSummaryPanel
  from "components/workflow/plan/step/runtime_settings/api_response/settings/RuntimeSettingsTaskApiResponseSettingsSummaryPanel";
import LogArrayField from "components/common/fields/log/LogArrayField";
import {Row} from "react-bootstrap";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function RuntimeSettingsTaskApiResponseSummaryPanel(
  {
    apiResponse,
    changedSteps,
  }) {
  const apiResponseModel = modelHelpers.parseObjectIntoModel(apiResponse, runtimeSettingsTaskApiResponseMetadata);
  const parsedChangedSteps = DataParsingHelper.parseArray(changedSteps, []);

  if (apiResponse == null) {
    return null;
  }

  return (
    <Row className={"mx-0"}>
      <Col xs={12} md={6}>
        <Row>
          <Col xs={12}>
            <H5FieldSubHeader
              subheaderText={"Runtime Settings Summary"}
              className={"my-2"}
            />
          </Col>
          <Col xs={12}>
            <EmailAddressField
              fieldName={"user"}
              model={apiResponseModel}
            />
          </Col>
          <Col xs={12}>
            <TextFieldBase
              fieldName={"summary"}
              dataObject={apiResponseModel}
            />
          </Col>
          <RuntimeSettingsTaskApiResponseSettingsSummaryPanel
            settings={apiResponseModel?.getData("settings")}
          />
          <Col xs={12}>
            <H5FieldSubHeader
              subheaderText={"Updated Pipeline Steps"}
              className={"my-2"}
            />
            {parsedChangedSteps.map((changedStep) => {
              return (
                <div key={changedStep?.stepId} className={"d-flex"}>
                  <div className={"mr-2"}>{changedStep?.name}</div>
                  <div>{changedStep?.stepId}</div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={6}>
        <LogArrayField
          model={apiResponseModel}
          fieldName={"log"}
        />
      </Col>
    </Row>
  );
}

RuntimeSettingsTaskApiResponseSummaryPanel.propTypes = {
  apiResponse: PropTypes.object,
  changedSteps: PropTypes.array,
};
