import React  from "react";
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

export default function FreeTrialUserExpirationOptionSelectionScreen(
  {
    setCurrentScreen,
    className,
  }) {

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={"How would you like to modify a Free Trial User?"}
        />
      </CenteredContentWrapper>
      <Row>
        <Col xs={6} sm={4}>
          <FreeTrialUserExpirationExtendUserExpirationSelectionCard
            setCurrentScreen={setCurrentScreen}
          />
        </Col>
        <Col xs={6} sm={4}>
          <FreeTrialUserExpirationRevokeAccessSelectionCard
            setCurrentScreen={setCurrentScreen}
          />
        </Col>
        <Col xs={6} sm={4}>
        <FreeTrialUserExpirationReinstateUserSelectionCard
          setCurrentScreen={setCurrentScreen}
        />
      </Col>
      </Row>
    </div>
  );
}

FreeTrialUserExpirationOptionSelectionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};