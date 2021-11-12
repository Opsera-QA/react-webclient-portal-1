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
        <div>
          {topGoal}
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (bottomGoal) {
      return (
        <div>
          {bottomGoal}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Row className={"w-100 h-100 text-center mx-auto"}>
        {getLeftDataBlockIcon()}
        <Col xs={12} className={"w-100 mt-auto"}>
          {getTopText()}
          {getMiddleText()}
        </Col>
        <Col xs={12} className="mt-auto text-muted">
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