import React from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreatePipelineWizard from "components/wizard/free_trial/pipeline/CreatePipelineWizard";

export default function PipelineWizardWidgets({className}) {
  const {themeConstants} = useComponentStateReference();
  const { toastContext } = useComponentStateReference();

  const launchPipelineCreationWizard = () => {
    toastContext.showOverlayPanel(
      <CreatePipelineWizard
      />
    );
  };

  return (
    <div className={className}>
      <Row>
        <Col xs={4}>
          <WidgetDataBlockBaseContainer
            backgroundColor={themeConstants.COLOR_PALETTE.WHITE}
            borderColor={themeConstants.BORDER_COLORS.GRAY}
            heightSize={3}
            widthSize={5}
            className={"mx-auto"}
          >
            <div className={"m-auto"}
              onClick={launchPipelineCreationWizard}
            >
              Salesforce Pipeline Wizard
            </div>
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

PipelineWizardWidgets.propTypes = {
  className: PropTypes.string,
};
