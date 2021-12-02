import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";

function ThreeLineDataBlockBase(
  {
    middleText,
    bottomText,
    topText,
    className,
    icon,
    infoOverlay,
  }) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div className={"data-block-left-icon"}>
          <IconBase icon={icon}  />
        </div>
      );
    }
  };

  const getInfoOverlayIcon = () => {
    if (infoOverlay) {
      return (
        <div className={"data-block-right-icon"}>
          <HelpInfoOverlayIcon
            infoOverlay={infoOverlay}
          />
        </div>
      );
    }
  };

  const getTopText = () => {
    if (topText) {
      return (
        <div className={"light-gray-text-secondary font-inter-light-300 metric-block-header-text"}>
          {topText}
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (middleText) {
      return (
        <div className={"dark-gray-text-primary font-inter-light-500"}>
          {middleText}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (bottomText) {
      return (
        <div className={"light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>
          {bottomText}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Row className={"w-100 h-100 mx-auto text-center"}>
        {getLeftDataBlockIcon()}
        {getInfoOverlayIcon()}
        <Col xs={12} className={"mt-2 w-100 text-center"}>
          {getTopText()}
        </Col>
        <Col xs={12} className={"my-auto text-center"}>
          {getMiddleText()}
        </Col>
        <Col xs={12} className={"mt-auto text-center"}>
          {getSubtitle()}
        </Col>
      </Row>
    </div>
  );
}

ThreeLineDataBlockBase.propTypes = {
  topText: PropTypes.any,
  middleText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  infoOverlay: PropTypes.any,
};

export default ThreeLineDataBlockBase;