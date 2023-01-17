import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useComponentStateReference from "hooks/useComponentStateReference";
import PolicyParametersInput
  from "components/settings/organization_settings/policies/details/inputs/PolicyParametersInput";
import PolicyNameField from "components/common/fields/settings/organization_settings/policies/PolicyNameField";
import PolicyValueTextInput
  from "components/settings/organization_settings/policies/details/inputs/PolicyValueTextInput";

export default function PolicyEditorPanelBase(
  {
    policyModel,
    setPolicyModel,
  }) {
  const {
    isSaasUser,
  } = useComponentStateReference();

  if (policyModel == null || isSaasUser !== false) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <PolicyNameField
          fieldName={"name"}
          model={policyModel}
        />
      </Col>
      <Col xs={12}>
        <PolicyValueTextInput
          policyModel={policyModel}
          setPolicyModel={setPolicyModel}
        />
      </Col>
      <Col xs={12}>
        <PolicyParametersInput
          policyModel={policyModel}
          setPolicyModel={setPolicyModel}
        />
      </Col>
    </Row>
  );
}

PolicyEditorPanelBase.propTypes = {
  policyModel: PropTypes.object,
  setPolicyModel: PropTypes.func,
};
