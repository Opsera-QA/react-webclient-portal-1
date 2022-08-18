import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconBase from "components/common/icons/IconBase";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function WizardWidgetDataBlockBase(
  {
    middleText,
    bottomText,
    onClickFunction,
    className,
    icon,
    disabled,
  }) {
  const {themeConstants} = useComponentStateReference();

  const getTopIcon = () => {
    if (icon) {
      return (
        <div>
          <IconBase icon={icon} iconSize={"xl"}/>
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (middleText) {
      return (
        <div className={"light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>
          {middleText}
        </div>
      );
    }
  };

  const getBottomText = () => {
    if (bottomText) {
      return (
        <div className={"dark-gray-text-primary font-inter-light-500"}>
          {bottomText}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <WidgetDataBlockBaseContainer
        backgroundColor={themeConstants.COLOR_PALETTE.WHITE}
        borderColor={themeConstants.BORDER_COLORS.GRAY}
        heightSize={3}
        widthSize={5}
        className={"mx-auto"}
        onClickFunction={onClickFunction}
        disabled={disabled}
      >
        <CenteredContentWrapper>
          <Row className={"w-100 h-100 mx-auto text-center"}>
            <Col xs={12} className={"my-auto text-center mx-0"}>
              {getTopIcon()}
            </Col>
            <Col xs={12} className={"my-auto text-center"}>
              {getMiddleText()}
            </Col>
            <Col xs={12} className={"mt-auto text-center"}>
              {getBottomText()}
            </Col>
          </Row>
        </CenteredContentWrapper>
      </WidgetDataBlockBaseContainer>
    </div>
  );
}

WizardWidgetDataBlockBase.propTypes = {
  middleText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  onClickFunction: PropTypes.func,
  disabled: PropTypes.bool,
};