import React from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FreeTrialLandingSalesforcePipelineWizardWidget
  from "components/trial/landing/widgets/wizard/pipeline/FreeTrialLandingSalesforcePipelineWizardWidget";

export default function FreeTrialLandingWizardWidgets({className}) {
  const {themeConstants} = useComponentStateReference();

  return (
    <div className={className}>
      <Row>
        <Col xs={4}>
          <FreeTrialLandingSalesforcePipelineWizardWidget

          />
        </Col>
        <Col xs={4}>
          <WidgetDataBlockBaseContainer
            backgroundColor={themeConstants.COLOR_PALETTE.WHITE}
            borderColor={themeConstants.BORDER_COLORS.GRAY}
            heightSize={3}
            widthSize={5}
            className={"mx-auto"}
          >
            SDLC Pipeline Wizard
          </WidgetDataBlockBaseContainer>
        </Col>
        <Col xs={4}>
          <WidgetDataBlockBaseContainer
            backgroundColor={themeConstants.COLOR_PALETTE.WHITE}
            borderColor={themeConstants.BORDER_COLORS.GRAY}
            heightSize={3}
            widthSize={5}
            className={"mx-auto"}
          >
            Git Custodian
          </WidgetDataBlockBaseContainer>
        </Col>
      </Row>
    </div>
  );
}

FreeTrialLandingWizardWidgets.propTypes = {
  className: PropTypes.string,
};
