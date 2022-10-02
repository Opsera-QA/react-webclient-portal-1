import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import FreeTrialUserExpirationRevokeAccessSelectionCard
  from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationRevokeAccessSelectionCard";
import { Col, Row } from "react-bootstrap";
import FreeTrialUserExpirationExtendUserExpirationSelectionCard
  from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationExtendUserExpirationSelectionCard";
import FreeTrialUserExpirationReinstateUserSelectionCard
  from "components/settings/trial/user_expiration/option_selection/FreeTrialUserExpirationReinstateUserSelectionCard";

export const FREE_TRIAL_USER_EXPIRATION_MANAGEMENT_SCREEN_LINKS = {
  OPTION_SELECTION_SCREEN: "/settings/trial/user-expiration-management",
  EXTEND_USER_EXPIRATION_SCREEN: "/settings/trial/user-expiration-management/extension",
  REVOKE_USER_ACCESS_SCREEN: "/settings/trial/user-expiration-management/revocation",
  REINSTATE_USER_ACCESS_SCREEN: "/settings/trial/user-expiration-management/reinstatement",
};

export default function FreeTrialUserExpirationOptionSelectionScreen(
  {
    className,
  }) {

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3"}
          subheaderText={"How would you like to modify a Free Trial User?"}
        />
      </CenteredContentWrapper>
      <Row>
        <Col xs={6} sm={4}>
          <FreeTrialUserExpirationExtendUserExpirationSelectionCard />
        </Col>
        <Col xs={6} sm={4}>
          <FreeTrialUserExpirationRevokeAccessSelectionCard />
        </Col>
        <Col xs={6} sm={4}>
          <FreeTrialUserExpirationReinstateUserSelectionCard />
        </Col>
      </Row>
    </div>
  );
}

FreeTrialUserExpirationOptionSelectionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};