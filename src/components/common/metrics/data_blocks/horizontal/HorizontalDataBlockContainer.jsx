import React from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import Col from "react-bootstrap/Col";

// TODO: Styling is temporary based on SonarRatings until we figure out which direction to go
function HorizontalDataBlockContainer({leftDataBlock, middleDataBlock, rightDataBlock, onClick, tooltipText, title}) {
  return (
    <TooltipWrapper innerText={tooltipText}>
      <div className={`${onClick ? "pointer " : ""}data-block-container m-1`} onClick={onClick}>
        <div className={"data-block-title px-2 py-1"}>
          {title}
        </div>
        <Row className={"mx-1"}>
          <Col sm={"25%"}>
            {leftDataBlock}
          </Col>
          <Col sm={"25%"}>
            {middleDataBlock}
          </Col>
          <Col sm={"50%"}>
            {rightDataBlock}
          </Col>
        </Row>
      </div>
    </TooltipWrapper>
  );
}

HorizontalDataBlockContainer.propTypes = {
  leftDataBlock: PropTypes.any,
  middleDataBlock: PropTypes.any,
  rightDataBlock: PropTypes.any,
  onClick: PropTypes.func,
  tooltipText: PropTypes.any,
  title: PropTypes.string,
};

export default HorizontalDataBlockContainer;