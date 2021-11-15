import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";

function TwoGoalDataBlockBase({ topGoal, bottomGoal, className, icon, }) {

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
    if (topGoal) {
      return (
        <div className={"dark-gray-text-primary metric-block-content-text"}>
          {topGoal}
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (bottomGoal) {
      return (
        <div className={"dark-gray-text-primary metric-block-content-text"}>
          {bottomGoal}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Row className={"w-100 h-100 text-center mx-auto font-inter-light-300"}>
        {getLeftDataBlockIcon()}
        <Col xs={12} className={"mt-2 w-100 mt-auto"}>
          {getTopText()}
          {getMiddleText()}
        </Col>
        <Col xs={12} className="mt-auto light-gray-text-secondary metric-block-footer-text">
          Goals
        </Col>
      </Row>
    </div>
  );
}

TwoGoalDataBlockBase.propTypes = {
  topGoal: PropTypes.any,
  bottomGoal: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
};

export default TwoGoalDataBlockBase;