import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ThreeLineDataBlockBase({ middleText, bottomText, topText, className, icon}) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div className={"data-block-left-icon"}>
          <IconBase icon={icon}  />
        </div>
      );
    }
  };

  const getTopText = () => {
    if (topText) {
      return (
        <div>
          {topText}
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (middleText) {
      return (
        <div>
          {middleText}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (bottomText) {
      return (
        <div>
          {bottomText}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Row className={"w-100 h-100 mx-auto text-center"}>
        {getLeftDataBlockIcon()}
        <Col xs={12} className={"w-100 text-center text-muted data-block-title-text"}>
          {getTopText()}
        </Col>
        <Col xs={12} className={"my-auto text-center data-block-focal-text"}>
          {getMiddleText()}
        </Col>
        <Col xs={12} className={"mt-auto text-center text-muted"}>
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
};

export default ThreeLineDataBlockBase;