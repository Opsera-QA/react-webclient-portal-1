import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import JsonField from "components/common/fields/json/JsonField";

export default function PolicySummaryPanel(
  {
    policyModel,
    setPolicyModel,
    setActiveTab,
  } ) {
  if (policyModel == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer
      setActiveTab={setActiveTab}
    >
      <Row>
        <Col lg={6}>
          <TextFieldBase
            className={"mb-2"}
            fieldName={"name"}
            dataObject={policyModel}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            className={"mb-2"}
            fieldName={"value"}
            dataObject={policyModel}
          />
        </Col>
        <Col lg={12}>
          {/*// TODO: Make field*/}
          <JsonField
            fieldName={"parameters"}
            dataObject={setPolicyModel}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PolicySummaryPanel.propTypes = {
  policyModel: PropTypes.object,
  setPolicyModel: PropTypes.func,
  setActiveTab: PropTypes.func,
};
