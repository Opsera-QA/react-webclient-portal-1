import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GitCustodianLandingWelcomeWidget from "components/landing/v2/git_custodian/GitCustodianLandingWelcomeWidget";
import GitCustodianLandingAccountStatsWidget
  from "components/landing/v2/git_custodian/GitCustodianLandingAccountStatsWidget";
import GitCustodianLandingMyWorkflowsWidget
  from "components/landing/v2/git_custodian/GitCustodianLandingMyWorkflowsWidget";
import GitCustodian from "components/insights/gitCustodian/GitCustodian";
import useGetOrganizationSettingsFeatureFlagModelByName
  from "hooks/settings/organization_settings/feature_flags/useGetOrganizationSettingsFeatureFlagModelByName";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";

export default function GitCustodianLandingScreen() {
  const {
    isActive,
  } = useGetOrganizationSettingsFeatureFlagModelByName(featureFlagConstants.FEATURE_FLAG_NAMES.ENABLE_GIT_CUSTODIAN_LANDING_PAGE);

  if (isActive !== true) {
    return (
      <GitCustodian />
    );
  }

  return (
    <div className={"max-content-width"}
    >
      <div className={"mt-3 mb-5"}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <GitCustodianLandingWelcomeWidget />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={6} className={"my-3"}>
            <div className={"mr-3 d-xs-none d-sm-none d-md-none d-lg-block"}/>
            <GitCustodianLandingAccountStatsWidget />
          </Col>
        </Row>
        <div className={"pt-3"}>
          <GitCustodianLandingMyWorkflowsWidget />
        </div>
      </div>
    </div>
  );
}

GitCustodianLandingScreen.propTypes = {};