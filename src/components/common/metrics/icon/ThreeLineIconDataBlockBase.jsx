import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconBase from "../../icons/IconBase";

function ThreeLineIconDataBlockBase(
  {
    middleText,
    bottomText,
    className,
    icon,
  }) {


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
      <Row className={"w-100 h-100 mx-auto text-center"}>
        <Col xs={12} className={"my-auto text-center"}>
          {getTopIcon()}
        </Col>
        <Col xs={12} className={"my-auto text-center"}>
          {getMiddleText()}
        </Col>
        <Col xs={12} className={"mt-auto text-center"}>
          {getBottomText()}
        </Col>
      </Row>
    </div>
  );
}

ThreeLineIconDataBlockBase.propTypes = {
  middleText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object
};

export default ThreeLineIconDataBlockBase;