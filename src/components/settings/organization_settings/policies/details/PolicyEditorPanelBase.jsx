import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PolicyParametersInput
  from "components/settings/organization_settings/policies/details/inputs/PolicyParametersInput";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyNameField from "components/common/fields/settings/organization_settings/policies/PolicyNameField";

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
        <TextInputBase
          fieldName={"value"}
          dataObject={policyModel}
          setDataObject={setPolicyModel}
          visible={policyModel?.getData("name") !== policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS}
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
